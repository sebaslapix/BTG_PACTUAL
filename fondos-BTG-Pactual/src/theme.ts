// src/theme.ts
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    brand: {
      500: "#007bff",  // Azul principal
      accent: "#32CD32", // Verde Lima de Acento
      error: "#FF6347",  // Rojo para errores
    },
    gray: {
      800: "#333333",  // Texto primario
    },
    success: {
      50: "#e6fffa",   // Verde claro para fondo de éxito
      500: "#28a745",  // Verde éxito principal
      600: "#2f855a",
      800: "#22543d",  // Verde oscuro
    },
  },
  components: {
    Button: {
      variants: {
        success: {
          bg: "success.500",  // Verde éxito para botones
          color: "white",
          _hover: {
            bg: "success.600", // Hover verde más oscuro
          },
        },
        info: {
          bg: "brand.500",  // Azul para botones
          color: "white",
          _hover: {
            bg: "brand.600", // Hover Azul más oscuro
          },
        },
      },
    },
    Text: {
      baseStyle: {
        color: 'gray.800',
        fontWeight: 'normal'
      },
      variants: {
        focus: {
          fontWeight: 'bold'
        },
        cards: {
          color: 'white',
          fontWeight: 'bold'
        },
      },
    }
  },
});
export default theme;