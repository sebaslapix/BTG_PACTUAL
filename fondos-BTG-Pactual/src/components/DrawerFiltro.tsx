import { Button, Checkbox, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Icon, Stack, Text } from "@chakra-ui/react"
import { RiDeleteBin6Line } from "react-icons/ri"

interface DrawerFiltroProps {
    selectedFilterCategoria: string,
    isOpen: boolean
    onClose: () => void
    handleCheckboxCategoriaChange: (value: string) => void
}

function DrawerFiltro({ selectedFilterCategoria, handleCheckboxCategoriaChange, isOpen, onClose }: DrawerFiltroProps) {
    return (
        <Drawer
            isOpen={isOpen}
            placement='bottom'
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Filtrar Por:</DrawerHeader>

                <DrawerBody>
                    <Icon as={RiDeleteBin6Line} cursor={'pointer'} onClick={() => { handleCheckboxCategoriaChange('') }} />
                    <Text mt={5}> Categoria </Text>
                    <Stack spacing={5} direction='row'>
                        <Checkbox
                            colorScheme='red'
                            isChecked={selectedFilterCategoria === 'fpv'}
                            onChange={() => handleCheckboxCategoriaChange('fpv')}
                        >
                            FPV
                        </Checkbox>
                        <Checkbox
                            colorScheme='red'
                            isChecked={selectedFilterCategoria === 'fic'}
                            onChange={() => handleCheckboxCategoriaChange('fic')}
                        >
                            FIC
                        </Checkbox>
                    </Stack>
                </DrawerBody>
                <DrawerFooter>
                    <Button colorScheme='blue' variant={'outline'} mr={3} onClick={onClose}>
                        Salir
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default DrawerFiltro