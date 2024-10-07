import { Badge, Box, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import BoxContainer from "./BoxContainer";
import { CiFilter } from "react-icons/ci";
import { fondo } from "../types";
import { useEffect, useState } from "react";
import ModalInscribirFondo from "./ModalInscribirFondo";
import ModalCancelarFondo from "./ModalCancelarFondo";
import DrawerFiltro from "./DrawerFiltro";
import ModalErrorSaldo from "./ModalErrorSaldo";

interface ControlFondosProps {
    fondos: fondo[]
    fondosInscritos: fondo[]
    saldo: number
    agregarNuevoFondo: (fondo: fondo, to:string, medio: string) => void
    cancelarFondo: (id: fondo['id']) => void
}

function ControlFondos({ fondos, fondosInscritos, saldo, agregarNuevoFondo, cancelarFondo }: ControlFondosProps) {

    const [fondoSeleccionado, setFondoSeleccionado] = useState<fondo>();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure()
    const { isOpen: isOpenModalConfirm, onOpen: onOpenModalConfirm, onClose: onCloseModalConfirm } = useDisclosure()
    const { isOpen: isOpenModalError, onOpen: onOpenModalError, onClose: onCloseModalError } = useDisclosure()
    const [selectedFilterCategoria, setSelectedFilterCategoria] = useState('');
    const [fondosDisponible, setFondosDisponible] = useState<fondo[]>(fondos);

    useEffect(() => {
        if (fondos && fondos.length > 0) {
          setFondosDisponible(fondos);
        }
      }, [fondos]);

    const handleCheckboxCategoriaChange = (value: string) => {
        setSelectedFilterCategoria(value);
        if(value !== ''){
            const filteredItems = [...fondos].filter(fondo => fondo.categoria.toLowerCase() === value)
            setFondosDisponible(filteredItems)
        }else{
            setFondosDisponible(fondos)
        }
    };

    const handleModal = (id: fondo['id']) => {
        const selectedIndex = fondos.findIndex(fondo => fondo.id === id)
        const fondo = fondos[selectedIndex]
        if (fondo.montoMinimo <= saldo) {
            setFondoSeleccionado(fondo)
            const fondoInscritoIndex = fondosInscritos.findIndex(fondo => fondo.id === id)
            if (fondoInscritoIndex >= 0) {
                onOpenModalConfirm()
            } else {
                onOpenModal()
            }
        } else {
            onOpenModalError()
        }
    }

    return (
        <>
            <BoxContainer mt={{ base: '10px', lg: '20px' }} display={'flex'} flexDirection={{ base: 'column', lg: 'row' }} justifyContent='space-between' alignItems={'center'}>
                <Box>
                    <Text> Fondos </Text>
                    <Box mt={4} maxW={'50vw'} display={'flex'} justifyContent={'flex-start'} alignItems={'center'} flexWrap={'nowrap'} overflowX={'auto'} gap={2} pr={'8px'}>
                        {
                            fondosDisponible.map(fondo => (
                                <Badge key={fondo.id} w={'auto'} p={'10px'} colorScheme="blue" borderRadius={'8px'} onClick={() => handleModal(fondo.id)} cursor={'pointer'}> {fondo.nombre} </Badge>
                            ))
                        }
                    </Box>
                </Box>
                <IconButton
                    icon={<CiFilter />}
                    aria-label='Filter'
                    onClick={onOpen}
                />
            </BoxContainer>

            <DrawerFiltro selectedFilterCategoria={selectedFilterCategoria} isOpen={isOpen} onClose={onClose} handleCheckboxCategoriaChange={handleCheckboxCategoriaChange}/>
            <ModalInscribirFondo fondoSeleccionado={fondoSeleccionado!} isOpen={isOpenModal} onClose={onCloseModal} agregarNuevoFondo={agregarNuevoFondo} onCloseModalConfirm={onCloseModalConfirm} />
            <ModalCancelarFondo fondoSeleccionado={fondoSeleccionado!} isOpen={isOpenModalConfirm} onClose={onCloseModalConfirm} cancelarFondo={cancelarFondo} />

            <ModalErrorSaldo saldo={saldo} fondoSeleccionado={fondoSeleccionado!} isOpen={isOpenModalError} onClose={onCloseModalError} />
        </>
    )
}

export default ControlFondos;