import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { fondo } from "../types"

interface ModalCancelarFondoProps {
    fondoSeleccionado: fondo,
    isOpen: boolean
    onClose: () => void
    cancelarFondo: (id: fondo['id']) => void
}

function ModalCancelarFondo({ fondoSeleccionado, cancelarFondo, isOpen, onClose }: ModalCancelarFondoProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader> Ya se encuentra inscrito al fondo: {fondoSeleccionado?.nombre}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Text> ${fondoSeleccionado?.montoMinimo} </Text>
                    <Text> {fondoSeleccionado?.categoria} </Text>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => {
                        cancelarFondo(fondoSeleccionado!.id)
                        onClose()
                    }}>
                        Cancelar Fondo
                    </Button>
                    <Button onClick={onClose}>Salir</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalCancelarFondo