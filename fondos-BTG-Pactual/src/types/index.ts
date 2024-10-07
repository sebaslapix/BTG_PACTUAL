export interface fondo {
    id: string
    nombre: string
    montoMinimo: number,
    categoria: string
}

export interface transacciones extends fondo {
    accion: string,
    suscrito: Date
}

export interface notificacion {
    to: string,
    mensaje: string
}