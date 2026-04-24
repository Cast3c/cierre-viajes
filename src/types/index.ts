// Así luce una empresa cuando la recibes de Supabase
export type Empresa = {
  id: string
  created_at: string
  nombre: string
  nit: string
  representante: string | null
  telefono: string | null
  email: string | null
  direccion: string | null
  activa: boolean
}
// Esto es lo que envías al CREAR una empresa nueva
// Nota: no incluye id ni created_at porque Supabase los genera solo
export type EmpresaNueva = Omit<Empresa, 'id' | 'created_at'>

export type Camion = {
  id: string
  created_at: string
  empresa: string
  placa: string
  marca: string | null
  modelo: string | null
  anio: number | null
  tipo_carroceria: string | null
  tons_capacity: number | null
  estado: string
  last_maintenace: string | null
}
export type CamionNuevo = Omit<Camion, 'id' | 'created_at'>
export type CamionConEmpresa = Camion & {
  empresas: { nombre: string }
}

export type Conductor = {
  id: string
  created_at: string
  tipo_contrato: string
  modalidad_pago: string 
  empresa: string
  identificacion: string
  nombres: string
  apellidos: string
  fecha_nacimiento: string | null
  licencia: string | null
  categoria_licencia: string | null
  fecha_vencimiento_licencia: string | null
  telefono: string |  null
  email: string | null
  direccion: string | null
  fecha_ingreso: string | null
  estado: string
  activo: boolean
}
export type ConductorNuevo = Omit<Conductor, 'id' | 'created_at'>
export type ConductorOverview={
  totalviajes: number;
  ganancia_bruta_total: number;
  gastos_total: number;
  ganancia_conductor_total: number;
}

export type Cliente = {
  id: string
  created_at: string
  nombre: string
  nit: string | null
  tipo: string
  ciudad: string | null
  direccion: string | null
  telefono: string | null
  email: string | null
  activo: boolean
}
export type ClienteNuevo = Omit<Cliente, 'id' | 'created_at'>


export type Viaje = {
  id: string
  created_at: string
  empresa: string
  conductor: string
  camion: string
  fecha_inicio: string | null
  fecha_fin: string | null
  origen: string
  destino: string
  estado: string
  valor_flete: number
  observaciones: string | null
}
export type ViajeNuevo = Omit<Viaje, 'id' | 'created_at'>
export type ViajeCliente = {
  id: string
  created_at: string
  viaje: string
  cliente: string
  orden_entrega: number
  destino_cliente: string
  descripcion_mercancia: string | null
  tipo_mercancia: string | null
  peso_kg: number | null
  volumen: number | null
  valor_declarado: number
  instrucciones: string | null
  valor_flete: number
  entregado: boolean
  fecha_entrega: string | null
  hubo_novedad: boolean
  descripcion_novedad: string | null
}
export type ViajeClienteNuevo = Omit<ViajeCliente, 'id' | 'created_at'>