/* External dependencies */
import { Box, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";

/* Local dependencies */
import SvgClose from "../../../assets/svg/SvgClose";
import { useActionsUser } from "../../../Hooks/useActions";
import API from "../../../Api";
import "./style.scss";

interface IPopupProps {
  signOut?: boolean;
  modal: boolean;
  setModal: (value: boolean) => void;
}

export default function Popup({ signOut, modal, setModal }: IPopupProps) {
  const { ActionGetUser } = useActionsUser();
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const destroyUser = async () => {
    try {
      const response = await API.delete("/users/destroy/");

      ActionGetUser(window.location.pathname.slice(6));
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      setSuccess(true);
    } catch (e) {
      setSuccess(false);
    }
  };

  const signOutFn = async () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {modal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.3,
              },
            }}
            className={`modal-backdrop`}
            onClick={() => setModal(false)}
            key={1}
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: {
                duration: 0.3,
              },
            }}
            className="modal--content"
            onClick={() => setModal(false)}
            key={2}
          >
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  delay: 0.3,
                  duration: 0.3,
                },
              }}
              onClick={(e) => e.stopPropagation()}
              className="modal--content__wrapper"
              key={3}
            >
              <Box
                bg="thirdlittleGray"
                h="166px"
                w="88vw"
                rounded="12px"
                zIndex="10"
              >
                <Box
                  w="17px"
                  h="17px"
                  ml="auto"
                  pr="22px"
                  pt="6px"
                  mb="20px"
                  onClick={() => {
                    setModal(false);
                    setSuccess(false);
                  }}
                >
                  <SvgClose />
                </Box>
                {!success ? (
                  <>
                    <Text
                      color="#C7C4C4"
                      textAlign="center"
                      fontSize="18px"
                      pb="18px"
                    >
                      medical
                      <span style={{ color: "#E11F26" }}>switzerland</span>
                    </Text>
                    <Text
                      fontSize="15px"
                      fontFamily="inter"
                      mb="27px"
                      textAlign="center"
                      color="white"
                    >
                      {signOut ? (
                        <Trans>signOut</Trans>
                      ) : (
                        <Trans>deleteProfileConfirm</Trans>
                      )}
                      ?
                    </Text>
                    <Box>
                      <Button
                        bg="#121212"
                        w="50%"
                        roundedBottomLeft="12px"
                        roundedTop="0"
                        roundedRight="0"
                        fontSize="15px"
                        color="white"
                        _focus={{ bg: "#202020" }}
                        onClick={() => (signOut ? signOutFn() : destroyUser())}
                      >
                        <Trans>yes</Trans>
                      </Button>
                      <Button
                        bg="#121212"
                        w="50%"
                        roundedBottomRight="12px"
                        roundedTop="0"
                        roundedLeft="0"
                        fontSize="15px"
                        color="white"
                        _focus={{ bg: "#202020" }}
                        onClick={() => setModal(false)}
                      >
                        <Trans>no</Trans>
                      </Button>
                    </Box>
                  </>
                ) : (
                  <Text
                    fontSize="12px"
                    fontFamily="inter"
                    mt="30px"
                    textAlign="center"
                    color="white"
                    onClick={() => setSuccess(!success)}
                  >
                    <Text
                        color="#C7C4C4"
                        textAlign="center"
                        fontSize="18px"
                        pb="18px"
                    >
                      medical
                      <span style={{ color: "#E11F26" }}>switzerland</span>
                    </Text>
                   <Trans>SuccessDelete</Trans>
                  </Text>
                )}
              </Box>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
