import Link from 'next/link';
import { Truck, ShieldCheck, BarChart3, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-primary p-3 rounded-xl">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-headline font-bold tracking-tight">FleetOps</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The intelligent logistics operating system. Secure, efficient, and AI-powered fleet management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary/10">
            <CardContent className="p-8 space-y-6">
              <div className="bg-primary/5 w-12 h-12 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Dispatcher Portal</h2>
                <p className="text-muted-foreground">Manage your fleet, optimize routes with AI, and track every trip in real-time from a centralized web dashboard.</p>
              </div>
              <Link href="/dashboard" className="block w-full">
                <Button className="w-full py-6 text-lg font-semibold group">
                  Access Dashboard
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-2 border-transparent hover:border-accent/10">
            <CardContent className="p-8 space-y-6">
              <div className="bg-accent/5 w-12 h-12 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-accent" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Driver Mobile App</h2>
                <p className="text-muted-foreground">Stay connected on the road. View trip details, update statuses, and upload delivery documents instantly.</p>
              </div>
              <Link href="/mobile" className="block w-full">
                <Button variant="outline" className="w-full py-6 text-lg font-semibold group border-accent text-accent hover:bg-accent hover:text-white">
                  Driver Login
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Trusted by logistics leaders worldwide. Powered by GenAI.
          </p>
        </div>
      </div>
    </div>
  );
}