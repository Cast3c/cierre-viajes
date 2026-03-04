'use server';
/**
 * @fileOverview An AI-powered tool for assisting dispatchers in assigning the most suitable trucks and drivers to new trips.
 *
 * - aiTripAssignmentAssistant - A function that handles the AI-powered trip assignment process.
 * - TripAssignmentInput - The input type for the aiTripAssignmentAssistant function.
 * - TripAssignmentOutput - The return type for the aiTripAssignmentAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Mock data for trucks and drivers for demonstration purposes.
// In a real application, these would be fetched from a database or external service.

interface MockTruck {
  id: string;
  licensePlate: string;
  capacityKg: number;
  currentLocation: string; // e.g., "latitude,longitude"
  isAvailable: boolean;
  availableFrom?: string; // ISO date-time string
}

interface MockDriver {
  id: string;
  name: string;
  qualifications: string[];
  currentLocation: string; // e.g., "latitude,longitude"
  isAvailable: boolean;
  availableFrom?: string; // ISO date-time string
}

const mockTrucks: MockTruck[] = [
  {
    id: 'TRK001',
    licensePlate: 'ABC-123',
    capacityKg: 10000,
    currentLocation: '34.0522,-118.2437', // Los Angeles
    isAvailable: true,
  },
  {
    id: 'TRK002',
    licensePlate: 'DEF-456',
    capacityKg: 15000,
    currentLocation: '37.7749,-122.4194', // San Francisco
    isAvailable: true,
  },
  {
    id: 'TRK003',
    licensePlate: 'GHI-789',
    capacityKg: 5000,
    currentLocation: '34.0522,-118.2437', // Los Angeles
    isAvailable: false,
    availableFrom: '2024-08-10T14:00:00Z',
  },
  {
    id: 'TRK004',
    licensePlate: 'JKL-012',
    capacityKg: 20000,
    currentLocation: '33.4484,-112.0740', // Phoenix
    isAvailable: true,
  },
  {
    id: 'TRK005',
    licensePlate: 'MNO-345',
    capacityKg: 8000,
    currentLocation: '37.7749,-122.4194', // San Francisco
    isAvailable: true,
  },
];

const mockDrivers: MockDriver[] = [
  {
    id: 'DRV001',
    name: 'Alice Smith',
    qualifications: ['standard', 'hazardous materials'],
    currentLocation: '34.0522,-118.2437', // Los Angeles
    isAvailable: true,
  },
  {
    id: 'DRV002',
    name: 'Bob Johnson',
    qualifications: ['standard', 'refrigerated cargo'],
    currentLocation: '37.7749,-122.4194', // San Francisco
    isAvailable: true,
  },
  {
    id: 'DRV003',
    name: 'Charlie Brown',
    qualifications: ['standard'],
    currentLocation: '34.0522,-118.2437', // Los Angeles
    isAvailable: false,
    availableFrom: '2024-08-10T16:00:00Z',
  },
  {
    id: 'DRV004',
    name: 'Diana Prince',
    qualifications: ['standard', 'oversized load'],
    currentLocation: '33.4484,-112.0740', // Phoenix
    isAvailable: true,
  },
  {
    id: 'DRV005',
    name: 'Eve Adams',
    qualifications: ['standard'],
    currentLocation: '37.7749,-122.4194', // San Francisco
    isAvailable: true,
  },
];

const TripAssignmentInputSchema = z.object({
  tripId: z.string().describe('A unique identifier for the trip.'),
  originLocation: z
    .string()
    .describe('The starting geographical location of the trip (e.g., "latitude,longitude" or "Address").'),
  destinationLocation: z
    .string()
    .describe('The ending geographical location of the trip (e.g., "latitude,longitude" or "Address").'),
  requiredCapacityKg: z.number().describe('The required cargo capacity for the trip in kilograms.'),
  requiredQualifications: z
    .array(z.string())
    .describe('An array of special qualifications required for the driver (e.g., "hazardous materials", "refrigerated cargo").'),
  tripStartTime: z
    .string()
    .datetime()
    .describe('The ISO date-time string indicating when the trip is scheduled to start.'),
});
export type TripAssignmentInput = z.infer<typeof TripAssignmentInputSchema>;

// Internal Schema for the Prompt to include dynamic context
const PromptInputSchema = TripAssignmentInputSchema.extend({
  trucks: z.string().describe('JSON string of filtered available trucks.'),
  drivers: z.string().describe('JSON string of filtered available drivers.'),
});

const SuggestedAssignmentSchema = z.object({
  driverId: z.string().describe('The ID of the suggested driver.'),
  driverName: z.string().describe('The name of the suggested driver.'),
  truckId: z.string().describe('The ID of the suggested truck.'),
  truckLicensePlate: z.string().describe('The license plate of the suggested truck.'),
  reasoning: z
    .string()
    .describe(
      'A detailed explanation of why this driver and truck pair is suitable for the trip, considering capacity, qualifications, availability, and proximity.'
    ),
  estimatedDistanceKm: z.number().optional().describe('The estimated driving distance for the trip in kilometers.'),
  estimatedTravelTimeMinutes: z.number().optional().describe('The estimated driving time for the trip in minutes.'),
});

const TripAssignmentOutputSchema = z.object({
  suggestedAssignments: z
    .array(SuggestedAssignmentSchema)
    .describe('An array of suggested truck and driver assignments.'),
  message: z
    .string()
    .optional()
    .describe('An overall message or summary regarding the assignment suggestions.'),
});
export type TripAssignmentOutput = z.infer<typeof TripAssignmentOutputSchema>;

/**
 * Mocks a distance calculation service. In a real app, this would call an external API.
 * Returns a random distance and duration for demonstration.
 */
const calculateDistance = ai.defineTool(
  {
    name: 'calculateDistance',
    description: 'Calculates the driving distance and estimated travel time between two geographical locations. Provide locations as "latitude,longitude" strings.',
    inputSchema: z.object({
      startLocation:
        z.string().describe('Starting geographical location as a "latitude,longitude" string.'),
      endLocation:
        z.string().describe('Ending geographical location as a "latitude,longitude" string.'),
    }),
    outputSchema: z.object({
      distanceKm: z.number().describe('Distance in kilometers.'),
      durationMinutes: z.number().describe('Estimated travel time in minutes.'),
    }),
  },
  async ({startLocation, endLocation}) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simple mock: assume direct line distance for now, or just random values.
    // In a real scenario, integrate with a mapping service API.
    const [lat1, lon1] = startLocation.split(',').map(Number);
    const [lat2, lon2] = endLocation.split(',').map(Number);

    const R = 6371; // Radius of Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // in km

    const speedKmPerHour = 60; // Average speed
    const duration = (distance / speedKmPerHour) * 60; // in minutes

    return {
      distanceKm: parseFloat(distance.toFixed(2)),
      durationMinutes: parseFloat(duration.toFixed(2)),
    };
  }
);

const prompt = ai.definePrompt({
  name: 'tripAssignmentPrompt',
  input: {schema: PromptInputSchema},
  output: {schema: TripAssignmentOutputSchema},
  tools: [calculateDistance],
  prompt: `You are an intelligent Fleet Dispatching Assistant. Your task is to recommend the most suitable trucks and drivers for a new logistics trip.

Here are the details for the new trip:
Trip ID: {{{tripId}}}
Origin Location: {{{originLocation}}}
Destination Location: {{{destinationLocation}}}
Required Capacity: {{{requiredCapacityKg}}} kg
Required Driver Qualifications: {{{#each requiredQualifications}}}'{{{this}}}' {{/each}}
Trip Start Time: {{{tripStartTime}}}

Available Trucks (consider their availability based on 'tripStartTime', only suggest if isAvailable is true or availableFrom is before or at tripStartTime):
{{{trucks}}}

Available Drivers (consider their availability based on 'tripStartTime', only suggest if isAvailable is true or availableFrom is before or at tripStartTime):
{{{drivers}}}

Filter trucks by ensuring their 'capacityKg' is greater than or equal to the 'requiredCapacityKg'.
Filter drivers by ensuring they possess ALL 'requiredQualifications'.
Prioritize available trucks and drivers whose 'isAvailable' is true, or whose 'availableFrom' is before or at 'tripStartTime'.

For the filtered list of available and qualified trucks and drivers:
1. For each potential truck, consider its 'currentLocation' relative to the 'Origin Location' of the trip. Use the 'calculateDistance' tool to estimate proximity.
2. For each potential driver, consider their 'currentLocation' relative to the 'Origin Location' of the trip. Use the 'calculateDistance' tool to estimate proximity.
3. Identify pairs of (truck, driver) that are suitable. A suitable pair means the truck meets capacity, the driver meets qualifications, and both are available.
4. Recommend the top 1-3 most suitable truck and driver pairs. For each recommendation, provide a detailed 'reasoning' explaining why they are the best fit, specifically mentioning how they meet the required capacity, qualifications, availability, and their proximity to the trip's origin.
5. Include the estimated travel distance and time for the trip itself, using the 'calculateDistance' tool for the 'Origin Location' and 'Destination Location' of the trip.

Ensure your output strictly adheres to the TripAssignmentOutputSchema provided, formatted as a JSON object.`,
});

export async function aiTripAssignmentAssistant(input: TripAssignmentInput): Promise<TripAssignmentOutput> {
  return tripAssignmentFlow(input);
}

const tripAssignmentFlow = ai.defineFlow(
  {
    name: 'aiTripAssignmentAssistantFlow',
    inputSchema: TripAssignmentInputSchema,
    outputSchema: TripAssignmentOutputSchema,
  },
  async input => {
    const tripStartTime = new Date(input.tripStartTime);

    // Simulate fetching available trucks from a service
    const availableTrucks = mockTrucks.filter(truck => {
      if (truck.isAvailable) {
        return truck.capacityKg >= input.requiredCapacityKg;
      } else if (truck.availableFrom) {
        const availableDate = new Date(truck.availableFrom);
        return availableDate <= tripStartTime && truck.capacityKg >= input.requiredCapacityKg;
      }
      return false;
    });

    // Simulate fetching available drivers from a service
    const availableDrivers = mockDrivers.filter(driver => {
      const hasAllQualifications = input.requiredQualifications.every(reqQual =>
        driver.qualifications.includes(reqQual)
      );
      if (driver.isAvailable) {
        return hasAllQualifications;
      } else if (driver.availableFrom) {
        const availableDate = new Date(driver.availableFrom);
        return availableDate <= tripStartTime && hasAllQualifications;
      }
      return false;
    });

    // Call the prompt with all the necessary context
    const {output} = await prompt({
      ...input,
      // Pass the filtered lists as JSON strings so they can be processed by the LLM
      trucks: JSON.stringify(availableTrucks),
      drivers: JSON.stringify(availableDrivers),
    });

    if (!output) {
      throw new Error('AI did not provide a valid trip assignment output.');
    }
    return output;
  }
);
