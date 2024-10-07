import { useDisclosure } from "@chakra-ui/react"
import { fondo } from "../types"
import FondoInscrito from "./FondoInscrito"
import { useState } from "react"
import ModalCancelarFondo from "./ModalCancelarFondo"
import ModalInformacionFondo from "./ModalInformacionFondo"

interface FondosProps {
    fondosInscritos: fondo[]
    cancelarFondo: (id: fondo['id']) => void
}

function FondosInscritos({ fondosInscritos, cancelarFondo }: FondosProps) {
    const [fondoSeleccionado, setFondoSeleccionado] = useState<fondo>();
    const { isOpen: isOpenModalConfirm, onOpen: onOpenModalConfirm, onClose: onCloseModalConfirm } = useDisclosure()
    const { isOpen: isOpenModalInformacion, onOpen: onOpenModalInformacion, onClose: onCloseModalInformacion } = useDisclosure()

    const handleCancelFondo = (id: fondo['id']) => {
        const selectedIndex = fondosInscritos.findIndex(fondo => fondo.id === id)
        const fondo = fondosInscritos[selectedIndex]
        setFondoSeleccionado(fondo)
        onOpenModalConfirm()
    }

    const handleInformacion = (id: fondo['id']) => {
        const selectedIndex = fondosInscritos.findIndex(fondo => fondo.id === id)
        const fondo = fondosInscritos[selectedIndex]
        setFondoSeleccionado(fondo)
        onOpenModalInformacion()
    }

    return (
        <>
            {
                fondosInscritos.map(fondo => (
                    <FondoInscrito key={fondo.id} id={fondo.id} nombre={fondo.nombre} categoria={fondo.categoria} handleInformacion={handleInformacion} handleCancelFondo={handleCancelFondo} />
                ))
            }

            <ModalCancelarFondo fondoSeleccionado={fondoSeleccionado!} isOpen={isOpenModalConfirm} onClose={onCloseModalConfirm} cancelarFondo={cancelarFondo} />
            <ModalInformacionFondo fondoSeleccionado={fondoSeleccionado!} isOpen={isOpenModalInformacion} onClose={onCloseModalInformacion}/>
        </>
    )
}

export default FondosInscritos