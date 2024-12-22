import { Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";

import SvgSuccess from "../../../assets/svg/SvgSuccess";
import { useAppSelector } from "../../../Hooks/Hooks";
import { useActionsForMessage } from "../../../Hooks/useActions";
import SvgKey from "../../../assets/svg/SvgKey";
import "./style.scss";
import { Trans } from "react-i18next";

export default function PopupForMessage() {
  const {
    ActionError,
    ActionReset,
    ActionUpload,
    ActionSuccess,
    ActionErrorMessenger,
  } = useActionsForMessage();
  const {
    success,
    error,
    reset_password,
    upload,
    errorMessenger,
    successMessenger,
  } = useAppSelector((state) => state.messageReducer);

  useEffect(() => {
    setTimeout(() => {
      ActionUpload(false);
      ActionSuccess(false);
    }, 3000);
  }, [success, upload]);

  useEffect(() => {
    setTimeout(() => {
      ActionError(false);
      ActionReset(false);
      ActionUpload(false);
      ActionErrorMessenger("");
    }, 4500);
  }, [upload, reset_password, error]);

  return (
    <>
      <Box
        w="100%"
        zIndex="5"
        minH="100vh"
        className={`bg--popup ${
          success || error || reset_password || upload ? "active" : ""
        }`}
      />
      <Box
        left="0"
        right="0"
        h="100vh"
        pt="20px"
        px="10px"
        zIndex="6"
        pos="fixed"
        className={`popupMessage ${
          success || error || reset_password || upload ? "transform" : ""
        }`}
      >
        <Box
          px="8px"
          h="151px"
          rounded="12px"
          bg="thirdlittleGray"
          boxShadow="0px 4px 4px rgba(20, 20, 20, 0.25), 0px 4px 4px #000000"
        >
          <Box
            h="151px"
            display="flex"
            flexDir="column"
            className="popup"
            alignItems="center"
            justifyContent="center"
          >
            {success && (
              <Box
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  mb="15px"
                  color="white"
                  fontSize="15px"
                  fontFamily="inter"
                  textAlign="center"
                >
                  <Trans>{successMessenger.title}</Trans>
                </Text>
                <Box mb="9px">
                  <SvgSuccess />
                </Box>
                <Text
                  color="white"
                  fontSize="10px"
                  fontWeight="300"
                  fontFamily="inter"
                >
                  <Trans>{successMessenger.desc}</Trans>
                </Text>
              </Box>
            )}
            {reset_password && (
              <Box
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  mb="16px"
                  color="white"
                  fontSize="15px"
                  fontWeight="500"
                  fontFamily="inter"
                >
                  <Trans>resetYourPasword</Trans>
                </Text>
                <SvgKey />
                <Text
                  mt="10px"
                  color="white"
                  fontSize="12px"
                  fontWeight="200"
                  fontFamily="inter"
                  textAlign="center"
                >
                  <Trans>descReset</Trans>
                </Text>
                {/* <Text
                  color="white"
                  fontSize="10px"
                  fontWeight="200"
                  fontFamily="inter"
                >
                  Please check inbox or spam folder
                </Text> */}
              </Box>
            )}
            {upload && (
              <Box
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  mb="15px"
                  color="white"
                  fontSize="15px"
                  fontWeight="400"
                  fontFamily="inter"
                  textAlign="center"
                >
                  <Trans>uploadTitle</Trans>
                </Text>
                <Box>
                  <SvgSuccess />
                </Box>
              </Box>
            )}
            {error && (
              <Box
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  color="white"
                  fontSize="15px"
                  fontWeight="400"
                  textAlign="center"
                  fontFamily="inter"
                >
                  <Trans>{errorMessenger}</Trans>
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
