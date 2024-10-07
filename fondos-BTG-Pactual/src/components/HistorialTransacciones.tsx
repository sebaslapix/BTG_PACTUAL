import { Box, Button, List, ListIcon, ListItem, Text } from "@chakra-ui/react"
import { useState } from "react"
import { transacciones } from "../types"
import { VscDebugContinue } from "react-icons/vsc"
import { formatoFecha } from "../helper/formatearTexto"

interface HistorialTransaccionesProps {
    transacciones: transacciones[]
}

function HistorialTransacciones({transacciones}:HistorialTransaccionesProps) {

  const [ verMas, setVerMas ] = useState(false)
  const slice = !verMas ? -5 : 0

    return (
        <>
            <Box mt={5} display={'flex'} flexDirection={{ base: 'column', lg: 'row' }} justifyContent='space-between' alignItems={'center'}>
                <Text variant={'focus'}> {!verMas ? 'últimas Transacciones' : 'Historial completo de transacciones'} </Text>
                {
                    transacciones.length > 5 && (<Button variant='info' onClick={() => setVerMas(prevState => !prevState)}> {!verMas ? 'Ver más' : 'Ver menos'} </Button>)
                }
            </Box>
            <List mt={5} spacing={3}>
                {
                    transacciones.slice(slice).reverse().map((transaccion, index) => (
                        <ListItem key={index} p={'10px'} cursor={'pointer'} _hover={{ background: '#E0E0E0' }} >
                            <ListIcon as={VscDebugContinue} />
                            {transaccion.nombre} - {transaccion.categoria}
                            <Text> {formatoFecha(new Date(transaccion.suscrito))} - {transaccion.accion} </Text>
                        </ListItem>
                    ))
                }
            </List>
        </>
    )
}

export default HistorialTransacciones