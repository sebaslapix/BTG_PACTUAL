import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react"
import { fondo } from "../types"
import { useRef, useState } from "react"

interface ModalInscribirFondoProps {
    fondoSeleccionado: fondo,
    isOpen: boolean
    onClose: () => void
    agregarNuevoFondo: (fondo: fondo, to: string, medio: string) => void
    onCloseModalConfirm: () => void
}

function ModalInscribirFondo({ fondoSeleccionado, isOpen, onClose, agregarNuevoFondo, onCloseModalConfirm }: ModalInscribirFondoProps) {
    const [medio, setMedio] = useState('1')
    const [ validacion, setValidacion ] = useState(false)
    const input = useRef<HTMLInputElement>(null)

    const handleValidacion = (notificacion: string) => {
        const value = input.current?.value
        const regex = notificacion === '1' ? /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/ : /^\+?[1-9]\d{9,14}$/
        const validacion = regex.test(value!)
        setValidacion(validacion)
    }

    const handleMedio = (value: string) => {
        setMedio(value)
        handleValidacion(value)
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader> Inscripción a fondo: {fondoSeleccionado?.nombre}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Text> ${fondoSeleccionado?.montoMinimo} </Text>
                    <Text> {fondoSeleccionado?.categoria} </Text>
                    <Text mt={5}> Notificar por: </Text>
                    <RadioGroup onChange={handleMedio} value={medio}>
                        <Stack direction='row'>
                            <Radio value='1'>Correo</Radio>
                            <Radio value='2'>Sms</Radio>
                        </Stack>
                    </RadioGroup>
                    <Input placeholder={medio === '1' ? 'ejemplo@dominio.com' : 'Celular (Colombia)'} ref={input} onChange={()=>handleValidacion(medio)}/>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} disabled={!validacion} onClick={() => {
                        agregarNuevoFondo(fondoSeleccionado!, input.current!.value, medio)
                        onClose()
                        setValidacion(false)
                        onCloseModalConfirm()
                    }}>
                        Inscribirse
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalInscribirFondo