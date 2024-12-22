import { Box, Text } from "@chakra-ui/react";
import { useAppSelector } from "../../../Hooks/Hooks";
import { useActionsGuest } from "../../../Hooks/useActions";
import { useEffect } from "react";
import SvgSuccess from "../../../assets/svg/SvgSuccess";

export default function PopupSuccessFull() {
  const { ActionGuestActiveSuccessModal } = useActionsGuest();
  const { successModal } = useAppSelector((state) => state.guestReducer);

  useEffect(() => {
    setTimeout(() => {
      ActionGuestActiveSuccessModal(false);
    }, 3000);
  }, [successModal]);

  return (
    <Box>
      <Box
        zIndex="8"
        h="100vh"
        left="0"
        right="0"
        top="0"
        className={`popupMessage ${successModal ? "transform" : ""}`}
        pos="fixed"
        pt="20px"
        px="10px"
      >
        <Box
          bg="thirdlittleGray"
          rounded="12px"
          boxShadow="0px 4px 4px rgba(20, 20, 20, 0.25), 0px 4px 4px #000000"
          px="17px"
          zIndex="11"
        >
          <Box
            className="popup"
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            zIndex="11"
            h="174px"
            px="60px"
          >
            <Text
              fontSize="15px"
              fontWeight="500"
              mb="13px"
              fontFamily="inter"
              textAlign="center"
              textColor="white"
            >
              Your one time password sent to your email
            </Text>
            <SvgSuccess />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
