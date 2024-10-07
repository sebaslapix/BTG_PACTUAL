import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, List, ListIcon, ListItem, Text } from "@chakra-ui/react"
import { VscDebugContinue } from "react-icons/vsc"
import { fondo } from "../types"

interface DrawerFondosDisponiblesProps {
    saldo: number
    fondos: fondo[],
    isOpen: boolean
    onClose: () => void
    handleModal: (id: fondo['id']) => void
}

function DrawerFondosDisponibles({saldo, fondos, isOpen, onClose, handleModal}: DrawerFondosDisponiblesProps){
    return(
        <Drawer
                isOpen={isOpen}
                placement='bottom'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Información Saldo: ${saldo}</DrawerHeader>

                    <DrawerBody>
                        <Text> Te puedes inscribir a los siguientes fondos: </Text>
                        <List mt={5} >
                            {
                                fondos.map(fondo => (
                                    fondo.montoMinimo <= saldo && (
                                        <ListItem key={fondo.id} p={'10px'} cursor={'pointer'} _hover={{ background: '#E0E0E0' }} onClick={() => handleModal(fondo.id)}>
                                            <ListIcon as={VscDebugContinue} />
                                            {fondo.nombre} - {fondo.categoria}
                                        </ListItem>
                                    )
                                ))
                            }
                        </List>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Salir
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
    )
}

export default DrawerFondosDisponibles