import { Button } from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/react";
import SvgExet from "../../assets/svg/SvgExit";

export default function Errors() {
  return (
    <Box
      pos="fixed"
      top="0"
      bottom="0"
      left="0"
      right="0"
      bg="black"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box>
        <Text
          fontFamily="inter"
          textColor="white"
          textAlign="center"
          fontSize="40px"
          mb="15px"
        >
          401
        </Text>
        <Text
          fontFamily="inter"
          textColor="white"
          textAlign="center"
          fontSize="20px"
          mb="20px"
        >
          Your authorization failed. Please try refreshing the page and fill in
          the correct login details.
        </Text>
        <Button bg="#0B6CFF" w="191px" rounded="4px">
          <SvgExet /> Back
        </Button>
      </Box>
    </Box>
  );
}
