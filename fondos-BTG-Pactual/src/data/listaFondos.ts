import { fondo } from "../types";

const listaFondos: fondo[] = [
    {
        id: '1',
        nombre: 'FPV_BTG_PACTUAL_RECAUDADORA',
        montoMinimo: 75000,
        categoria: 'FPV'
    },
    {
        id: '2',
        nombre: 'FPV_BTG_PACTUAL_ECOPETROL',
        montoMinimo: 125000,
        categoria: 'FPV'
    },
    {
        id: '3',
        nombre: 'DEUDAPRIVADA',
        montoMinimo: 50000,
        categoria: 'FIC'
    },
    {
        id: '4',
        nombre: 'FDO-ACCIONES',
        montoMinimo: 250000,
        categoria: 'FIC'
    },
    {
        id: '5',
        nombre: 'FPV_BTG_PACTUAL_DINAMICA',
        montoMinimo: 100000,
        categoria: 'FPV'
    }
]

export default listaFondos;