import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { fondo } from "../types"

interface ModalErrorSaldoProps {
    saldo: number
    fondoSeleccionado: fondo
    isOpen: boolean
    onClose: () => void
}

function ModalErrorSaldo({ saldo, fondoSeleccionado, isOpen, onClose }: ModalErrorSaldoProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader> Saldo Insuficiente </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Text> No tiene saldo suficiente para vincularse al fondo: {fondoSeleccionado?.nombre} </Text>
                    <Text> Monto mínimo: {fondoSeleccionado?.montoMinimo} </Text>
                    <Text> Saldo actual: {saldo} </Text>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose}>Salir</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalErrorSaldo