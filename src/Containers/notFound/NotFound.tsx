import { Box, Text } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Box
      bg="black"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box>
        <Text
          textColor="white"
          fontWeight="500"
          fontFamily="inter"
          fontSize="40px"
          textAlign="center"
          mb="15px"
        >
          404
        </Text>
        <Box cursor="pointer">
          <a href="https://www.medicalswitzerland.ch/" target="_blank">
            <Text
              textColor="white"
              fontWeight="500"
              fontFamily="inter"
              fontSize="20px"
              textAlign="center"
              px="103px"
              mb="5px"
            >
              Page not found.
            </Text>
          </a>
          <a href="https://www.medicalswitzerland.ch/" target="_blank">
            <Text
              textColor="white"
              fontWeight="500"
              fontFamily="inter"
              fontSize="20px"
              textAlign="center"
              px="103px"
              mb="27px"
              textDecoration="underline"
            >
              Go to Home page
            </Text>
          </a>
        </Box>
        <Text color="#C7C4C4" textAlign="center" fontSize="23px" mb="10px">
          medical
          <span style={{ color: "#E11F26" }}>switzerland</span>
        </Text>
      </Box>
    </Box>
  );
}
