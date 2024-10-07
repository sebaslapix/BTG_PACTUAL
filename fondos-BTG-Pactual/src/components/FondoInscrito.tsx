import { Box, Button, CloseButton, Text } from "@chakra-ui/react"
import { fondo } from "../types"

interface FondoProps {
    id: fondo['id']
    nombre: string,
    categoria: string,
    handleCancelFondo: (id: fondo['id']) => void,
    handleInformacion: (id: fondo['id']) => void
}

function FondoInscrito({id, nombre, categoria, handleCancelFondo, handleInformacion}: FondoProps) {
    return (
        <Box position={'relative'} zIndex={1} w={'400px'} flexShrink={0} border={'1px solid #E0E0E0'} boxShadow={'0px 0px 2px #E0E0E0'} borderRadius={'8px'} overflow={'hidden'} cursor={'pointer'}>
            <Box width={'100%'} p={'10px'} bg={'green'} display={'flex'} justifyContent={'space-between'}>
                <Text variant={'cards'}> {nombre} </Text>
                <Text variant={'cards'}> {categoria} </Text>
            </Box>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'flex-start'} p={'10px'}>
                <Text> Inscripción del <Text as={'span'}> 04/10/2024 </Text> </Text>
                <CloseButton position={'relative'} zIndex={2} size='sm' onClick={()=>handleCancelFondo(id)}/>
            </Box>
            <Button position={'relative'} zIndex={2} width={'full'} borderRadius={'0px'} variant='info' onClick={()=>handleInformacion(id)}> Ver más </Button>
        </Box>
    )
}

export default FondoInscrito