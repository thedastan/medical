/* External dependencies */
import axios from "axios";
import { Box, Text } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";

/* Local dependencies */
import SvgEyePassword from "../../assets/svg/SvgEyePassword";
import SvgClose from "../../assets/svg/SvgClose";
import SvgEye from "../../assets/svg/SvgEye";
import ImageForm from "../../assets/Image/authImage.png";
import "./style.scss";

import { useAppSelector } from "../../Hooks/Hooks";
import {
  useActionsAuth,
  useActionsForMessage,
  useActionsUser,
} from "../../Hooks/useActions";
import API, { API_ADDRESS } from "../../Api";
import { Image } from "@chakra-ui/react";
import Loading from "../Ui/Loading";

interface IAuthPostData {
  email: string;
  password: string;
  confirm: string;
}

interface Inputs {
  email?: string;
  password?: string;
}

export default function Registration() {
  const language = localStorage.getItem("language") as string;

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { ActionGetUser } = useActionsUser();
  const { LoginPost, ActiveModalRegistration } = useActionsAuth();
  const {
    ActionReset,
    ActionError,
    ActionSuccess,
    ActionErrorMessenger,
    ActionSuccessMessenger,
  } = useActionsForMessage();
  const { loading, loginLoder } = useAppSelector((state) => state.authReducer);
  const { user, error } = useAppSelector((state) => state.userReducer);

  const [dataPost, setDataPost] = useState<IAuthPostData>({
    confirm: "",
    email: "",
    password: "",
  });
  const [validate, setValidate] = useState({
    confirm: false,
    email: false,
    password: false,
  });
  const [takenEmail, setTakenEmail] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [eye, setEye] = useState({ password: false, confirm: false });

  const listInput = [
    {
      id: 1,
      placeholder:
        language === "de"
          ? "Geben Sie ihre E-Mail Adresse ein"
          : "Enter your email",
      name: "email",
      register: "email",
      type: "text",
      value: dataPost.email,
      valdation: validate.email,
      required: true,
      pattern: /^\S+@\S+$/i,
      errors: errors.email,
    },
    {
      id: 3,
      placeholder:
        language === "de" ? "Neues Passwort eingeben" : "Enter new password",
      name: "password",
      register: "password",
      type: eye.password ? "text" : "password",
      value: dataPost.password,
      valdation: validate.password,
      required: true,
      errors: errors.password,
      eye: <Box>{eye.password ? <SvgEye /> : <SvgEyePassword />}</Box>,
    },
  ];

  const inputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    keys: string
  ) => {
    setDataPost({ ...dataPost, [`${keys}`]: e.target.value });
  };

  const handleAuthPost = (e: any) => {
    e.preventDefault();
    setLoginLoading(true);

    if (user.email) {
      axios
        .post(`${API_ADDRESS}users/auth/`, {
          email: user.email,
          password: dataPost.password,
        })
        .then((response) => {
          localStorage.setItem("accessToken", response.data.access);
          localStorage.setItem("refreshToken", response.data.refresh);
          ActiveModalRegistration(false);
          ActionGetUser(window.location.pathname.slice(6));
          window.location.reload();
          setLoginLoading(false);
        })
        .catch((e) => {
          setValidate({ ...validate, password: true });
          setLoginLoading(false);
        });
    } else {
      ActionError(true);
      ActionErrorMessenger("thereIsNoSuch");
      setLoginLoading(false);
    }
  };

  const handleLoginUser = () => {
    if (dataPost.password !== dataPost.confirm) {
      setValidate({ ...validate, confirm: true });
    } else {
      axios
        .put(
          `${API_ADDRESS}users/?card_id=${window.location.pathname.slice(6)}`,
          {
            email: dataPost.email,
            password: dataPost.password,
            username: "",
            avatar: "",
            contact: "",
            birth_date: null,
            allergies: "",
            emergency_contact: "",
            particularities: "",
            operation: "",
            allergies_text: "",
            medications: "",
            why_diagnose: "",
            profession: "",
            card_id: user.card_id,
            location: "",
            full_name: "",
          }
        )
        .then(() => {
          ActionSuccess(true);
          ActionSuccessMessenger({
            title: "sayHello",
            desc: "yourRegistration",
          });
          ActionGetUser(window.location.pathname.slice(6));
          setTakenEmail(false);
          ActiveModalRegistration(false);
        })
        .catch(() => {
          ActiveModalRegistration(true);
          setTakenEmail(true);
        });
    }
  };

  const changeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataPost({ ...dataPost, confirm: e.target.value });
  };

  const forgotPassword = () => {
    axios
      .post(`${API_ADDRESS}users/reset_link/`, { email: user.email })
      .then(() => {
        ActionReset(true);
      })
      .catch(() => {
        ActionError(true);
        ActionErrorMessenger("emailNotForForgotPassword");
      });
  };

  useEffect(() => {
    if (dataPost.password === dataPost.confirm) {
      setValidate({ ...validate, confirm: false });
    }
  }, [validate.confirm]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.3,
          },
        }}
        className={`modal-backdrop`}
        key={1}
        onClick={() => ActiveModalRegistration(false)}
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
        key={2}
        onClick={() => ActiveModalRegistration(false)}
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
          <Box bg="#272727" h="auto" rounded="12px" w="90vw" zIndex="6">
            <Box
              px="30px"
              w="17px"
              h="17px"
              ml="auto"
              pr="25px"
              pt="4px"
              cursor="pointer"
              mb="10px"
              onClick={() => ActiveModalRegistration(false)}
            >
              <SvgClose />
            </Box>
            {user.is_first_time ? (
              <>
                <Text
                  color="white"
                  fontSize="15px"
                  fontWeight="400"
                  textAlign="center"
                  fontFamily="inter"
                  mb="32px"
                  px="42px"
                >
                  <Trans>welcomeToYour</Trans>
                </Text>

                <Box maxW="344px" mb="10px">
                  <Image src={ImageForm} w="100%" h="auto" />
                </Box>
                <Text
                  color="white"
                  fontSize="15px"
                  fontWeight="400"
                  textAlign="center"
                  fontFamily="inter"
                  mb="13px"
                  px="42px"
                >
                  <Trans>letsStartWith</Trans>
                </Text>
                {loading ? (
                  <Text>Loading...</Text>
                ) : (
                  <form onSubmit={handleSubmit(handleLoginUser)}>
                    <Box display="flex" flexDir="column" maxW="300px" mx="auto">
                      {listInput.map((el, index) => (
                        <Box
                          key={el.id}
                          mb="10px"
                          w="100%"
                          mx="auto"
                          pos="relative"
                        >
                          <Input
                            placeholder={el.placeholder}
                            textAlign="center"
                            fontSize="15px"
                            fontWeight="200"
                            textColor="white"
                            rounded="4px"
                            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                            h="50px"
                            bg="#303030"
                            type={el.type}
                            {...register(index === 0 ? "email" : "password", {
                              required: el.required,
                              pattern: el.pattern,
                            })}
                            border={
                              takenEmail && index === 0
                                ? "1px solid red"
                                : el.errors
                                ? "1px solid red"
                                : "1px solid #303030"
                            }
                            defaultValue={el.value}
                              // @ts-ignore
                            onChange={(e) => inputChange(e, el.name)}
                          />
                          <Box
                            pos="absolute"
                            zIndex="8"
                            right="12px"
                            top="0"
                            bottom="0"
                            display="flex"
                            alignItems="center"
                            cursor="pointer"
                            onClick={() =>
                              setEye({ ...eye, password: !eye.password })
                            }
                          >
                            {el.eye}
                          </Box>
                        </Box>
                      ))}
                      <Box mb="17px" w="100%" mx="auto" position="relative">
                        <Input
                          placeholder={`${
                            language === "de"
                              ? "Passwort bestätigen"
                              : "Confirm  password"
                          }`}
                          textAlign="center"
                          fontSize="15px"
                          fontWeight="200"
                          textColor="white"
                          rounded="4px"
                          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                          h="50px"
                          bg="#303030"
                          type={eye.confirm ? "text" : "password"}
                          border={
                            validate.confirm
                              ? "1px solid red"
                              : "1px solid #303030"
                          }
                          defaultValue={dataPost.confirm}
                            // @ts-ignore
                          onChange={(e) => changeConfirmPassword(e)}
                        />
                        <Box
                          pos="absolute"
                          zIndex="8"
                          right="12px"
                          top="0"
                          bottom="0"
                          display="flex"
                          alignItems="center"
                          cursor="pointer"
                          onClick={() =>
                            setEye({ ...eye, confirm: !eye.confirm })
                          }
                        >
                          {eye.confirm ? <SvgEye /> : <SvgEyePassword />}
                        </Box>
                      </Box>
                      {errors.email && (
                        <Text
                          color="#FF0000"
                          fontSize="10px"
                          fontWeight="200"
                          fontFamily="inter"
                          mb="7px"
                        >
                          <Trans>wrongEmailAdress</Trans>
                        </Text>
                      )}
                      {errors.password && (
                        <Text
                          color="#FF0000"
                          fontSize="10px"
                          fontWeight="200"
                          fontFamily="inter"
                          mb="7px"
                        >
                          <Trans>requiredFields</Trans>
                        </Text>
                      )}
                      {validate.confirm && (
                        <Text
                          color="#FF0000"
                          fontSize="10px"
                          fontWeight="200"
                          fontFamily="inter"
                          mb="7px"
                        >
                          <Trans>passwordDoesNot</Trans>
                        </Text>
                      )}

                      {takenEmail && (
                        <Text
                          color="#FF0000"
                          fontSize="10px"
                          fontWeight="200"
                          fontFamily="inter"
                          mb="7px"
                        >
                          <Trans>takenEmail</Trans>
                        </Text>
                      )}

                      <Button
                        fontFamily="inter"
                        fontSize="15px"
                        w="100%"
                        h="40px"
                        bg="#0B6CFF"
                        textColor="white"
                        fontWeight="700"
                        border="1px solid #0B6CFF"
                        rounded="5px"
                        mx="auto"
                        type="submit"
                        mb="90px"
                      >
                        <Trans>register</Trans>
                      </Button>
                    </Box>
                  </form>
                )}
              </>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignContent="center"
                mt="12px"
              >
                {loginLoder ? (
                  <Text textColor="white" textAlign="center">
                    Loading...
                  </Text>
                ) : (
                  <Box mb="3px" w="100%" px="30px">
                    <Text
                      fontFamily="inter"
                      fontWeight="300"
                      textColor="white"
                      textAlign="center"
                      mb="13px"
                      fontSize="15"
                    >
                      <Trans>welcome</Trans>
                    </Text>
                    <Text
                      fontFamily="inter"
                      fontWeight="700"
                      textColor="white"
                      textAlign="center"
                      mb="22px"
                      fontSize="15"
                    >
                      {user.full_name?.split(" ")[0]}
                    </Text>

                    <form onSubmit={handleAuthPost}>
                      {loginLoading ? (
                        <Box p="20px">
                          <Loading />
                        </Box>
                      ) : (
                        <>
                          <Box position="relative">
                            <Input
                              focusBorderColor={
                                validate.password ? "#FF0000" : "#303030"
                              }
                              textColor="white"
                              placeholder={`${
                                language === "de"
                                  ? "Passwort eingeben"
                                  : "Enter Password"
                              }`}
                              fontSize="15px"
                              fontWeight="200"
                              rounded="4px"
                              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                              border={
                                validate.password
                                  ? "1px solid #FF0000"
                                  : "1px solid #303030"
                              }
                              h="50px"
                              bg="#303030"
                              textAlign="center"
                              type={eye.password ? "text" : "password"}
                                // @ts-ignore
                              onChange={(e) =>
                                setDataPost({
                                  ...dataPost,
                                  password: e.target.value,
                                })
                              }
                            />
                            <Box
                              pos="absolute"
                              zIndex="8"
                              right="12px"
                              top="0"
                              bottom="0"
                              display="flex"
                              alignItems="center"
                              cursor="pointer"
                              onClick={() =>
                                setEye({ ...eye, password: !eye.password })
                              }
                            >
                              {eye.password ? <SvgEye /> : <SvgEyePassword />}
                            </Box>
                          </Box>
                          <Text
                            w="85%"
                            ml="auto"
                            fontWeight="500"
                            mt="5px"
                            color="#0B6CFF"
                            fontSize="12px"
                            mb="8px"
                            textAlign="start"
                            fontFamily="inter"
                            cursor="pointer"
                            onClick={forgotPassword}
                          >
                            <Trans>clickIfYouDontRememberYourPassword</Trans>
                          </Text>
                          {validate.password && (
                            <Text
                              color="#FF0000"
                              fontSize="10px"
                              fontWeight="200"
                              fontFamily="inter"
                              mb="7px"
                            >
                              <Trans>checkTheUserName</Trans>
                            </Text>
                          )}
                          <Button
                            fontFamily="inter"
                            fontSize="15px"
                            w="100%"
                            h="40px"
                            bg="#0B6CFF"
                            textColor="white"
                            fontWeight="700"
                            border="1px solid #0B6CFF"
                            rounded="5px"
                            mx="auto"
                            mb="51px"
                            type="submit"
                            onClick={handleAuthPost}
                          >
                            Login
                          </Button>
                        </>
                      )}
                    </form>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
