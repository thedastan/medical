import axios from "axios";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import SvgClose from "../../assets/svg/SvgClose";
import {
  useActionsFile,
  useActionsForMessage,
  useActionsGuest,
  useActionsUser,
} from "../../Hooks/useActions";
import { useAppSelector } from "../../Hooks/Hooks";
import { API_ADDRESS } from "../../Api";
import PopupSuccessFull from "./popup/PopupSuccessFull";
import { Trans, useTranslation } from "react-i18next";

export default function GeustMode() {
  const language = localStorage.getItem("language") as string;

  const { t } = useTranslation();
  const { ActionGroupsForGuest } = useActionsFile();
  const { ActionError, ActionErrorMessenger } = useActionsForMessage();
  const { ActionGetUser } = useActionsUser();
  const {
    ActionGetGuestId,
    ActionGuestActiveModa,
    ActionGuestActiveSuccessModal,
  } = useActionsGuest();
  const { activeModal } = useAppSelector((state) => state.guestReducer);

  const [dataPost, setDataPost] = useState({ name: "", email: "" });
  const [validate, setValidate] = useState({ name: false, email: false });
  const [validateCode, setValidateCode] = useState(false);

  const [code, setCode] = useState(false);
  const [codeStrig, setCodeString] = useState("");
  const codeActive = sessionStorage.getItem("active") as string;

  function postGuestData() {
    if (!dataPost.name.length && !dataPost.email.length) {
      setValidate({ ...validate, email: true, name: true });
    } else if (!dataPost.email.length) {
      setValidate({ ...validate, email: true, name: false });
    } else if (!dataPost.name.length) {
      setValidate({ ...validate, name: true, email: false });
    } else {
      if (dataPost.email.slice(-10) === "@gmail.com") {
        axios
          .post(
            `${API_ADDRESS}users/${window.location.pathname.slice(6)}/guest/`,
            {
              name: dataPost.name,
              email: dataPost.email,
            }
          )
          .then(() => {
            setCode(true);
            sessionStorage.setItem("active", "true");
            ActionGuestActiveSuccessModal(true);
          });
      } else {
        ActionError(true);
        ActionErrorMessenger("wrongEmail")
      }
    }
  }

  function postGuestDataCode() {
    axios
      .post(
        `${API_ADDRESS}users/${window.location.pathname.slice(
          6
        )}/guest/activate/`,
        {
          code: codeStrig,
        }
      )
      .then(({ data }) => {
        sessionStorage.setItem("guestId", data.guest_id);
        ActionGroupsForGuest(window.location.pathname.slice(6), data.guest_id);
        ActionGetUser(window.location.pathname.slice(6));
        ActionGetGuestId(data.guest_id);
        setCode(false);
        ActionGuestActiveModa(false);
      })
      .catch(() => {
        setValidateCode(true);
      });
  }

  useEffect(() => {
    if (code) {
      setTimeout(() => {
        setCode(false);
        sessionStorage.removeItem("active");
      }, 60 * 60 * 1000);
    }
  });

  return (
    <Box>
      <Box
        zIndex="5"
        className={`bg--popup ${activeModal ? "active" : ""}`}
        w="100%"
        minH="100vh"
      />
      <PopupSuccessFull />
      <Box
        top="200px"
        bottom="0"
        zIndex="6"
        left="0"
        right="0"
        className={`popupMessage ${activeModal ? "transform" : ""}`}
        position="fixed"
        pt="20px"
        px="10px"
      >
        <Box
          bg="thirdlittleGray"
          rounded="12px"
          boxShadow="0px 4px 4px rgba(20, 20, 20, 0.25), 0px 4px 4px #000000"
          px="17px"
        >
          <Box
            className="popup"
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              w="25px"
              h="30px"
              ml="auto"
              display="flex"
              justifyContent="end"
              alignItems="center"
              onClick={() => ActionGuestActiveModa(false)}
            >
              <SvgClose />
            </Box>
            <Text fontSize="20px" fontFamily="inter" color="white" mb="12px">
              <Trans>guestLogin</Trans>
            </Text>
            {code || codeActive ? (
              <Box>
                <Text
                  fontFamily="inter"
                  fontSize="12px"
                  mb="21"
                  textAlign="center"
                  textColor="white"
                >
                  <Trans>desc</Trans>
                </Text>
                <Input
                  placeholder={`${
                    language === "de"
                      ? "6 - stelligen Zahlencode eingeben"
                      : "Enter your 6 Digit Code"
                  }`}
                  textAlign="center"
                  fontSize="15px"
                  fontWeight="200"
                  textColor="white"
                  rounded="4px"
                  value={codeStrig}
                  maxLength={6}
                  boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                  h="50px"
                  bg="#303030"
                  type="text"
                  mb="19px"
                  border={validateCode ? "1px solid red" : "1px solid #303030"}
                  onChange={(e) => setCodeString(e.target.value)}
                />

                <Button
                  w="100%"
                  h="50px"
                  bg="#FFC700"
                  fontFamily="inter"
                  fontWeight="500"
                  fontSize="15px"
                  rounded="4px"
                  mb={validateCode ? "8px" : "59px"}
                  boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                  onClick={postGuestDataCode}
                >
                  <Trans>login</Trans>
                </Button>
                {validateCode && (
                  <Text
                    color="#FF0000"
                    fontSize="10px"
                    fontWeight="200"
                    fontFamily="inter"
                    mb="51px"
                    textAlign="center"
                  >
                    <Trans>thisIsCode</Trans>
                  </Text>
                )}
              </Box>
            ) : (
              <Box>
                <Input
                  className="input-guest"
                  placeholder={`${
                    language === "de" ? "Ihren Namen" : "Your name"
                  }`}
                  textAlign="center"
                  color="#fff"
                  fontSize="15px"
                  fontWeight="200"
                  textColor="#fff"
                  rounded="4px"
                  boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                  h="50px"
                  bg="#303030"
                  type="email"
                  mb="8px"
                  border={validate.name ? "1px solid red" : "1px solid #303030"}
                  onChange={(e) =>
                    setDataPost({ ...dataPost, name: e.target.value })
                  }
                />
                <Input
                  placeholder={`${
                    language === "de" ? "Email eingeben" : "Enter Email"
                  }`}
                  textAlign="center"
                  fontSize="15px"
                  fontWeight="200"
                  textColor="#fff"
                  rounded="4px"
                  boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                  h="50px"
                  bg="#303030"
                  type="email"
                  mb="19px"
                  border={
                    validate.email ? "1px solid red" : "1px solid #303030"
                  }
                  onChange={(e) =>
                    setDataPost({ ...dataPost, email: e.target.value })
                  }
                />

                <Button
                  w="100%"
                  h="50px"
                  bg="#FFC700"
                  fontFamily="inter"
                  fontWeight="500"
                  fontSize="15px"
                  rounded="4px"
                  mb={validate.name || validate.email ? "16px" : "59px"}
                  boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                  onClick={postGuestData}
                >
                  <Trans>next</Trans>
                </Button>
                {validate.email && validate.name && (
                  <Text
                    color="#FF0000"
                    fontSize="10px"
                    fontWeight="200"
                    fontFamily="inter"
                    mb="43px"
                    textAlign="center"
                  >
                    <Trans>fileAnAll</Trans>
                  </Text>
                )}
                {!validate.email && validate.name && (
                  <Text
                    color="#FF0000"
                    fontSize="10px"
                    fontWeight="200"
                    fontFamily="inter"
                    mb="43px"
                    textAlign="center"
                  >
                    <Trans>fileAnAll</Trans>
                  </Text>
                )}
                {validate.email && !validate.name && (
                  <Text
                    color="#FF0000"
                    fontSize="10px"
                    fontWeight="200"
                    fontFamily="inter"
                    mb="43px"
                    textAlign="center"
                  >
                    <Trans>fileAnAll</Trans>
                  </Text>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
