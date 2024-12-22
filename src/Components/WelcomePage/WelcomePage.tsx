/* External dependencies */
import { Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";

/* Local dependencies */
import "./style.scss";

export default function WelcomePage() {
  const { t } = useTranslation();

  const [isVisible, setIsVisible] = useState(true);
  const [display, setDisplay] = useState("block");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplay("none");
    }, 2550);
    return () => clearTimeout(timer);
  });

  return (
    <Box
      bg="black"
      pos="fixed"
      left="0"
      right="0"
      top="0"
      bottom="0"
      zIndex="10"
      display={display}
      className={`welcome-container ${isVisible ? "visible" : ""}`}
    >
      <Box
        className="welcome-message"
        minH="100%"
        display="flex"
        flexDir="column"
        justifyContent="center"
      >
        <Text color="#C7C4C4" textAlign="center" fontSize="31.5px" mb="10px">
          medical
          <span style={{ color: "#E11F26" }}>switzerland</span>
        </Text>
        <Text
          textColor="#C7C4C4"
          textAlign="center"
          fontSize="28.5px"
          fontFamily="Helvetica"
          fontWeight="400"
        >
          <Trans>medicalRecord</Trans>
        </Text>
      </Box>
    </Box>
  );
}
