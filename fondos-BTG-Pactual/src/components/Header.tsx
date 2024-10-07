import { Button, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import BoxContainer from "./BoxContainer";
import { capitalizeWords } from "../helper/formatearTexto";
import { MdOutlineAttachMoney } from "react-icons/md";
import { fondo } from "../types";
import { useState } from "react";
import DrawerFondosDisponibles from "./DrawerFondosDisponibles";
import ModalInscribirFondo from "./ModalInscribirFondo";
import ModalCancelarFondo from "./ModalCancelarFondo";

interface HeaderProps {
    cargando: boolean
    usuario: string
    saldo: number,
    fondos: fondo[],
    fondosInscritos: fondo[]
    agregarNuevoFondo: (fondo: fondo, to:string, medio: string) => void
    cancelarFondo: (id: fondo['id']) => void
}

function Header({ cargando, usuario, saldo, fondos, fondosInscritos, agregarNuevoFondo, cancelarFondo }: HeaderProps) {

    const [fondoSeleccionado, setFondoSeleccionado] = useState<fondo>();
    const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure()
    const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure()
    const { isOpen: isOpenModalConfirm, onOpen: onOpenModalConfirm, onClose: onCloseModalConfirm } = useDisclosure()

    const handleModal = (id: fondo['id']) => {
        const selectedIndex = fondos.findIndex(fondo => fondo.id === id)
        const fondo = fondos[selectedIndex]
        setFondoSeleccionado(fondo)
        const fondoInscritoIndex = fondosInscritos.findIndex(fondo => fondo.id === id)
        if (fondoInscritoIndex >= 0) {
            onOpenModalConfirm()
        } else {
            onOpenModal()
        }
    }

    return (
        <>
            <BoxContainer display={'flex'} flexDirection={{ base: 'column', lg: 'row' }} justifyContent='space-between' alignItems={'center'}>
                <Text> Hola, <Text as='span' variant='focus'> {capitalizeWords(usuario)} </Text> </Text>
                <Button leftIcon={<MdOutlineAttachMoney />} variant='success' onClick={onOpenDrawer}>
                    {!cargando ? saldo : (<Spinner />)}
                </Button>
            </BoxContainer>

            <DrawerFondosDisponibles saldo={saldo} fondos={fondos} isOpen={isOpenDrawer} onClose={onCloseDrawer} handleModal={handleModal}/>
            <ModalInscribirFondo fondoSeleccionado={fondoSeleccionado!} isOpen={isOpenModal} onClose={onCloseModal} agregarNuevoFondo={agregarNuevoFondo} onCloseModalConfirm={onCloseModalConfirm} />
            <ModalCancelarFondo fondoSeleccionado={fondoSeleccionado!} isOpen={isOpenModalConfirm} onClose={onCloseModalConfirm} cancelarFondo={cancelarFondo} />
        </>
    )
}

export default Header;