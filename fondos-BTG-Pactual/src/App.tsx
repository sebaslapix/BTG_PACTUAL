import { Box, Spinner, Text } from '@chakra-ui/react'
import BoxContainer from './components/BoxContainer';
import Header from './components/Header';
import useFondos from './hooks/useFondos';
import Fondos from './components/FondosInscritos';
import ControlFondos from './components/ControlFondos';
import HistorialTransacciones from './components/HistorialTransacciones';

function App() {

  const { cargando, fondos, fondosInscritos, transacciones, agregarNuevoFondo, cancelarFondo, calcularSaldo } = useFondos();

  const saldo = calcularSaldo()

  return (
    <Box width='100%' minH={'100vh'} bg={'#f8f7f7'}>
      <Box width={{ base: '100%', lg: '70%' }} mx={'auto'} py={{ base: '30px', lg: '50px' }}>
        <Header usuario='Jhon Sebastian' cargando={cargando} saldo={saldo} fondos={fondos} fondosInscritos={fondosInscritos} agregarNuevoFondo={agregarNuevoFondo} cancelarFondo={cancelarFondo} />
        {
          cargando ?
            (
              <Spinner />
            )
            :
            (
              <ControlFondos fondos={fondos} saldo={saldo} fondosInscritos={fondosInscritos} agregarNuevoFondo={agregarNuevoFondo} cancelarFondo={cancelarFondo} />
            )
        }
        <BoxContainer mt={{ base: '10px', lg: '20px' }}>
          <Text> Inscrito a: {fondosInscritos.length} fondos </Text>
          <Box mt={5} width={'auto'} display={'flex'} justifyContent={'flex-start'} alignItems={'center'} flexWrap={'nowrap'} overflowX={'auto'} gap={5}>
            {
              cargando ?
                (
                  <Spinner />
                )
                :
                (
                  <Fondos fondosInscritos={fondosInscritos} cancelarFondo={cancelarFondo} />
                )
            }
          </Box>
        </BoxContainer>
        <BoxContainer mt={{ base: '10px', lg: '20px' }} height={'550px'} overflowY={'auto'}>
          {
            cargando ?
              (
                <Spinner />
              )
              :
              (
                <HistorialTransacciones transacciones={transacciones} />
              )
          }
        </BoxContainer>
      </Box>
    </Box>
  )
}

export default App