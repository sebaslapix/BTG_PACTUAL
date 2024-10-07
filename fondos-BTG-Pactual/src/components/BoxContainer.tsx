import { Box, BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ContainerProps extends BoxProps {
    children: ReactNode;
  }

function BoxContainer({children, ...props}:ContainerProps){
    return(
        <Box p={'20px'} border={'1px solid #E0E0E0'} boxShadow={'0px 0px 2px #E0E0E0'} borderRadius={'8px'} bg={'white'} {...props}>
            {
                children
            }
        </Box>
    )
}

export default BoxContainer;