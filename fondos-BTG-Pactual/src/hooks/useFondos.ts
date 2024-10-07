import { useEffect, useState } from "react"
import { fondo, notificacion, transacciones } from "../types"
import Peticion from "../helper/Peticion"
import { useToast } from "@chakra-ui/react"

const useFondos = () => {

    console.log(import.meta.env.VITE_APP_API_URL)
    
    const [ fondos, setFondos ] = useState<fondo[]>([])
    const [fondosInscritos, setFondosInscritos] = useState<fondo[]>([])
    const [transacciones, setTransacciones] = useState<transacciones[]>([])
    const [ cargando, setCargando ] = useState(false)
    const [ monto_Inicial, setMontoInicial ] = useState(0)
    const toastMessage = useToast();

    useEffect(()=>{
        obtenerMontoInicial()
        obtenerFondos()
        obtenerFondosInscritos()
        obtenerTransacciones()
    }, [])

    const obtenerMontoInicial = async() => {
        setCargando(true);
        const data = await Peticion(import.meta.env.VITE_APP_API_URL + "monto_inicial");
        setCargando(false);
        if(data.status === "success"){
            setMontoInicial(data.monto)
        }else{
            showToast('error', 'Error Obteniendo el monto Inicial')
        }
    }

    const obtenerFondos = async() => {
        setCargando(true);
        const data = await Peticion(import.meta.env.VITE_APP_API_URL + "fondos");
        setCargando(false);
        if(data.status === "success"){
            setFondos(data.fondos)
        }else{
            showToast('error', 'Error Obteniendo los fondos')
        }
    }

    const agregarNuevoFondo = async (fondo:fondo, to:string, medio: string) => {
        setCargando(true);
        const data = await Peticion(import.meta.env.VITE_APP_API_URL + "fondos-inscrito", "POST", fondo);
        if(data.status === "success"){
            await enviarNotificacion(to, medio, fondo.nombre)
            // await obtenerFondosInscritos()
            // await obtenerTransacciones()
            showToast('success', `Fondo ${fondo.nombre} inscrito`)
        }else{
            showToast('error', `Error Agregando el fondo ${fondo.nombre}`)
        }
        setCargando(false);
    }

    const cancelarFondo = async(id: fondo['id']) => {
        setCargando(true);
        const data = await Peticion(import.meta.env.VITE_APP_API_URL + `fondos-inscrito/${id}`, "DELETE");
        if(data.status === "success"){
            await obtenerFondosInscritos()
            await obtenerTransacciones()
            showToast('success', 'Fondo Eliminado')
        }else{
            showToast('error', 'Error eliminado el fondo')
        }
        setCargando(false);
    }

    const calcularSaldo = () => {
        const total = fondosInscritos.reduce((total, fondo) => total + fondo.montoMinimo, 0)
        const saldo = monto_Inicial - total
        return saldo
    }

    const enviarNotificacion = async (to:string, medio:string, nombreFondo: string) => {
        const ruta = medio === '1' ? 'send-email' : 'send-sms'
        const notificacion: notificacion = {
            to,
            mensaje: `Se ha inscrito al fondo ${nombreFondo}`
        }
        const data = await Peticion(import.meta.env.VITE_APP_API_URL + ruta, "POST", notificacion);
        if(data.status === "success"){
            showToast('success', 'Notificación enviada')
        }else{
            showToast('error', "Error enviando la notificación")
        }
    }

    const obtenerFondosInscritos = async () => {
        setCargando(true);
        const data = await Peticion(import.meta.env.VITE_APP_API_URL + "fondos-inscritos");
        setCargando(false);
        if(data.status === "success"){
            setFondosInscritos(data.fondos)
        }else{
            showToast('error', "Error obteniendo los fondos inscritos")
        }
    }

    const obtenerTransacciones = async () => {
        setCargando(true);
        const data = await Peticion(import.meta.env.VITE_APP_API_URL + "transacciones");
        setCargando(false);
        if(data.status === "success"){
            setTransacciones(data.fondos)
        }else{
            showToast('error', "Error obteniendo las transacciones")
        }
    }

    const showToast = (accion:"error" | "info" | "warning" | "success" | "loading" | undefined, mensaje:string) => {
        toastMessage({
          title: mensaje,
          description: "",
          status: accion,
          position: 'top-right',
          duration: 5000, // Duración de la notificación
          isClosable: true, // Se puede cerrar manualmente
        });
      };
      

    return {
        cargando,
        fondos,
        fondosInscritos,
        transacciones,
        agregarNuevoFondo,
        cancelarFondo,
        calcularSaldo,
    }
}

export default useFondos;