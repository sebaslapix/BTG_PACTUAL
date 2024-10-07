import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { fondo } from "../types"

interface ModalInformacionFondoProps {
    fondoSeleccionado: fondo,
    isOpen: boolean
    onClose: () => void
}

function ModalInformacionFondo({ fondoSeleccionado, isOpen, onClose }: ModalInformacionFondoProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader> {fondoSeleccionado?.nombre} - {fondoSeleccionado?.categoria} </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    {
                        fondoSeleccionado?.categoria.toLowerCase() === 'fpv' ?
                            (
                                <Text>
                                    El Fondo Voluntario de Pensión (FPV) de BTG Pactual es un vehículo de inversión a través del
                                    cual se pueden obtener óptimos rendimientos de acuerdo con las políticas de inversión
                                    previstas, cumplir con las metas de ahorro o de pensión obligatoria y obtener beneficios
                                    tributarios, previo cumplimiento de los requisitos de ley.
                                </Text>
                            )
                            :
                            (
                                <Text>
                                    los Fondos de Inversión
                                    Colectiva (FIC’s) son opciones de inversión que agrupan un número de inversionistas,
                                    gestionadas por un equipo experto que, a través de la selección de activos globales y locales,
                                    estructura fondos con objetivos y plazos definidos con el fin común de tener retornos de capital
                                    y diversificación del riesgo.
                                </Text>
                            )
                    }
                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose}>Salir</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalInformacionFondo