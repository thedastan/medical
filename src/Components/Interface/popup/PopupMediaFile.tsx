/* External dependencies */
import { Box, Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { createRef, useEffect, useRef, useState } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import { Button, Image, Input, Switch } from "@chakra-ui/react";
import { Trans, useTranslation } from "react-i18next";
import "cropperjs/dist/cropper.css";

/* Local dependencies */
import SvgPdf from "../../../assets/svg/SvgPdf";
import i18n from "../../../i18n/I18n";
import API, { API_ADDRESS } from "../../../Api";
import Popup from "../../Ui/popup/Popup";
import "./style.css";

import { dataURLtoFile, getAccessToken, onChangeImage } from "../../Helpers";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hooks";
import {
  useActionsFile,
  useActionsForMessage,
  useActionsForModal,
  useActionsUser,
} from "../../../Hooks/useActions";
import { InterfaceImageTypes } from "../redux-image/types/Types";
import SvgExet from "../../../assets/svg/SvgExit";
import SvgSignOut from "../../../assets/svg/SvgSignOut";
import SvgMore from "../../../assets/svg/SvgMore";
import SvgGuest from "../../../assets/svg/SvgGuest";
import { ActionGetUser } from "../redux/action/Action";
import SvgAvatarDefault from "../../../assets/svg/SvgAvatartDefault";
import SvgChange from "../../../assets/svg/SvgChange";
import axios from "axios";
import Select from "../../Ui/Select/Select";
import SvgRedBasket from "../../../assets/svg/SvgRedBasket";
import BarLoader from "react-spinners/BarLoader";
import PopupForMessage from "../../Ui/popups/PopupForMessage";

export default function PopupMediaFile() {
  const lang = localStorage.getItem("language") as string;

  const { t } = useTranslation();

  //Actions
  const dispatch = useAppDispatch();
  const { ActionUpload, ActionError, ActionErrorMessenger, ActionReset } =
    useActionsForMessage();
  const { ActionActiveModalMedia, ActionFilesId } = useActionsForModal();
  const { ActionAllGroups } = useActionsFile();
  const { ActionPutUser } = useActionsUser();

  //States
  const { filesId, activeMediaModal, profile, subtract, isAkte } =
    useAppSelector((state) => state.modalReducer);
  const { user } = useAppSelector((state) => state.userReducer);

  //useRefs
  const imageRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const fileRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const cropperRef = createRef<ReactCropperElement>();

  const examinationGuestMode = sessionStorage.getItem("guestMode");

  //useStates
  const [accept, setAccept] = useState("");
  const [loader, setLoader] = useState(false);
  const [cropData, setCropData] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [validate, setValidate] = useState(false);
  const [isChecked, setIsChecked] = useState(
    () => JSON.parse(window.localStorage.getItem("isChecked") as any) ?? false
  );

  const [renderMore, setRenderMore] = useState(false);
  const [textVaildate, setTextValidate] = useState(false);
  const [titleValidate, setTitleValidate] = useState(false);

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [filePdf, setFilePdf] = useState<any>();
  const [signOut, setSignOut] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [pdfIncludes, setPdfIncludes] = useState(false);
  const [checked, setChecked] = useState(false);

  //functions
  const handleClickForDeleteProfile = async () => {
    if (getAccessToken()) {
      setOpenPopup(true);
      setSignOut(false);
      ActionActiveModalMedia(false);
    }
  };

  const getCropData = () => {
    if (!title.length) {
      setTitleValidate(true);
    } else if (!title.length) {
      setTitleValidate(true);
    } else {
      if (typeof cropperRef.current?.cropper !== "undefined") {
        setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      }
    }

    if (filesId) {
      if (typeof cropperRef.current?.cropper !== "undefined") {
        setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
        setRenderMore(true);
      }
    }
    setChecked(!checked);
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0];
      setFilePdf(i);
      setPdfIncludes(true);
    }
  };

  const handlePostFiles = async () => {
    try {
      const response = await API.post("groups/", {
        title: title,
        is_akte: isAkte,
      });
      const dataGroup = response.data;

      const image = cropData
        ? dataURLtoFile(cropData, `${Math.floor(Math.random() * 100000)}.png`)
        : filePdf;
      const formData = new FormData();
      formData.append("file", image);

      if (dataGroup) {
        setLoader(true);
        dispatch({
          type: InterfaceImageTypes.USER_FILES_LOADER,
          payload: true,
        });
        await API.post("users/upload/", formData)
          .then(({ data }) => {
            if (data) {
              API.post(`groups/${dataGroup.id}/info/`, {
                text: text ? text : "   ",
                file_url: data.path,
              })
                .then(() => {
                  dispatch({
                    type: InterfaceImageTypes.USER_FILES_LOADER,
                    payload: false,
                  });
                  ActionActiveModalMedia(false);
                  setTextValidate(false);
                  setPdfIncludes(false);
                  ActionUpload(true);
                  setLoader(false);
                  ActionAllGroups();
                  setImageFile("");
                  setCropData("");
                  setText("");
                  setTitle("");
                })
                .catch((e) => {
                  dispatch({
                    type: InterfaceImageTypes.USER_FILES_LOADER,
                    payload: false,
                  });
                  ActionActiveModalMedia(false);
                  setTextValidate(false);
                  setPdfIncludes(false);
                  setLoader(false);
                  ActionAllGroups();
                  setImageFile("");
                  setCropData("");
                  setText("");
                  setTitle("");
                  ActionError(true);
                  ActionErrorMessenger(`${e}`);
                });
            }
          })
          .catch((e) => {
            setLoader(false);
            ActionActiveModalMedia(false);
            setTextValidate(false);
            setPdfIncludes(false);
            ActionUpload(true);
            setLoader(false);
            ActionError(true);
            ActionErrorMessenger("fileABig");
          });
      }
    } catch (e) {
      ActionError(true);
      ActionErrorMessenger(`${e}`);
    }
  };

  const handlePostMoreFiles = async () => {
    const image = cropData
      ? dataURLtoFile(cropData, `${Math.floor(Math.random() * 100000)}.png`)
      : filePdf;
    const formData = new FormData();
    formData.append("file", image);

    setLoader(true);
    dispatch({
      type: InterfaceImageTypes.USER_FILES_LOADER,
      payload: true,
    });
    await API.post("users/upload/", formData)
      .then(({ data }) => {
        if (data) {
          API.post(`groups/${filesId}/info/`, {
            text: text ? text : "   ",
            file_url: data.path,
          })
            .then(() => {
              dispatch({
                type: InterfaceImageTypes.USER_FILES_LOADER,
                payload: false,
              });
              ActionActiveModalMedia(false);
              setTextValidate(false);
              setPdfIncludes(false);
              ActionUpload(true);
              setLoader(false);
              ActionAllGroups();
              ActionFilesId("");
              setImageFile("");
              setCropData("");
              setText("");
              setTitle("");
            })
            .catch((e) => {
              dispatch({
                type: InterfaceImageTypes.USER_FILES_LOADER,
                payload: false,
              });
              ActionActiveModalMedia(false);
              ActionErrorMessenger(e);
              setTextValidate(false);
              setPdfIncludes(false);
              ActionAllGroups();
              setLoader(false);
              ActionError(true);
              setImageFile("");
              setCropData("");
              setText("");
              setTitle("");
            });
        }
      })
      .catch((e) => {
        ActionErrorMessenger(e);
        ActionError(true);
        setLoader(false);
      });
  };

  const handleCencelCrop = () => {
    ActionActiveModalMedia(false);
    ActionFilesId("");
    setImageFile("");
    setCropData("");
    setText("");
  };

  const handleCloseModal = () => {
    ActionActiveModalMedia(false);
    setPdfIncludes(false);
    ActionFilesId("");
    setText("");
  };

  const onChange = (event: string) => {
    setLanguage(event);
    i18n.changeLanguage(event);
    localStorage.setItem("language", event);
    ActionGetUser(window.location.pathname.slice(6));
  };

  const activeGuestMode = (e: boolean) => {
    ActionPutUser(window.location.pathname.slice(6), {
      allergies: user.allergies,
      allergies_text: user.allergies_text,
      avatar: user.avatar?.slice(6) || "",
      birth_date: user.birth_date,
      card_id: user.card_id,
      contact: user.contact,
      email: user.email,
      emergency_contact: user.emergency_contact,
      full_name: user.full_name,
      location: user.location,
      medications: user.medications,
      operation: user.operation,
      particularities: user.particularities,
      profession: user.particularities,
      username: user.username,
      why_diagnose: user.why_diagnose,
      guest_mode: isChecked ? false : true,
    });
    setIsChecked(e);
    ActionGetUser(window.location.pathname.slice(6));
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

  // useEffects;
  useEffect(() => {
    if (cropData && title.length) {
      if (!filesId) {
        handlePostFiles();
      }
    }
  }, [validate, checked]);

  useEffect(() => {
    if (filesId) {
      handlePostMoreFiles();
    }
  }, [renderMore, checked]);

  useEffect(() => {
    ActionGetUser(window.location.pathname.slice(6));
  }, [examinationGuestMode]);

  useEffect(() => {
    window.localStorage.setItem("isChecked", JSON.stringify(isChecked));
  }, [isChecked]);

  useEffect(() => {
    window.localStorage.setItem("isChecked", JSON.stringify(user.guest_mode));
  }, [user]);

  useEffect(() => {
    ActionGetUser(window.location.pathname.slice(6));
  }, [isChecked]);

  useEffect(() => {
    if (user.guest_mode) {
      window.localStorage.setItem("isChecked", JSON.stringify(true));
    } else {
      window.localStorage.setItem("isChecked", JSON.stringify(false));
    }
  });

  if (loader) {
    return (
      <Box
        minH="100vh"
        bg="rgba(0, 0, 0, 0.6)"
        pos="fixed"
        top="0"
        bottom="0"
        left="0"
        right="0"
        display="flex"
        zIndex="2"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          bg="black"
          pb="30px"
          rounded="4px"
        >
          <Text
            fontSize="14px"
            fontFamily="inter"
            color="white"
            pt="30px"
            px="20px"
            mb="20px"
          >
            <Trans>fileUpload</Trans>
          </Text>
          <BarLoader color="#0B6CFF" width="115px" />
        </Box>
      </Box>
    );
  }

  return (
    <AnimatePresence>
      {activeMediaModal && (
        <>
          <motion.div
            key={1}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.3,
              },
            }}
            className={`modal-backdrop`}
            onClick={handleCloseModal}
          />
          <motion.div
            key={2}
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: {
                duration: 0.3,
              },
            }}
            className="modal-content-wrapper"
            onClick={handleCloseModal}
          >
            <motion.div
              key={3}
              initial={{ y: 100, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  delay: 0.3,
                  duration: 0.3,
                },
              }}
              onClick={(e) => e.stopPropagation()}
              className="modal-content"
            >
          
              {subtract && (
                <Box zIndex="6">
                  <Text
                    cursor="pointer"
                    color="#0F6FFF"
                    py="10px"
                    bg="thirdlittleGray"
                    textAlign="center"
                    roundedTop="7px"
                    onClick={() => {
                      setAccept("image/png, image/gif, image/jpeg");
                      imageRef.current?.click();
                    }}
                    fontFamily="inter"
                  >
                    <Trans>photo</Trans>
                  </Text>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept={accept}
                    ref={imageRef}
                    onChange={(e) => onChangeImage(e, setImageFile)}
                  />
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept="application/pdf, application/vnd.ms-excel, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    ref={fileRef}
                    onChange={handleFile}
                  />
                  <Text
                    cursor="pointer"
                    color="#0F6FFF"
                    py="10px"
                    bg="thirdlittleGray"
                    textAlign="center"
                    roundedBottom="7px"
                    onClick={() => {
                      fileRef.current?.click();
                    }}
                    fontFamily="inter"
                  >
                    <Trans>document</Trans>
                  </Text>
                </Box>
              )}
              {profile && (
                <Box px="29px" bg="#171717" pt="31px" pb="44px" rounded="10px">
                  <Box display="flex" justifyContent="center" mb="12px">
                    {user.avatar ? (
                      <Image
                        src={`${API_ADDRESS?.substring(
                          0,
                          35
                        )}${user.avatar.slice(1)}`}
                        alt="avatar"
                        w="49px"
                        h="49px"
                        mx="auto"
                        rounded="50%"
                        objectFit="cover"
                      />
                    ) : (
                      <SvgAvatarDefault />
                    )}
                  </Box>
                  <Text
                    textAlign="center"
                    fontWeight="400"
                    textColor="white"
                    fontFamily="inter"
                    fontSize="20px"
                    mb="47px"
                  >
                    {user.full_name}
                  </Text>
                  <Box
                    mb="19px"
                    rounded="5px"
                    display="flex"
                    alignItems="center"
                    bg="#1F1F1F"
                    textAlign="center"
                    onClick={() => {
                      ActionActiveModalMedia(false);
                      setOpenPopup(true);
                      setSignOut(true);
                    }}
                  >
                    <Box
                      w="18%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <SvgSignOut />
                    </Box>
                    <Box
                      w="90%"
                      h="50px"
                      pl="15px"
                      mx="auto"
                      display="flex"
                      alignItems="center"
                      justifyContent="start"
                    >
                      <Text
                        color="white"
                        fontWeight="300"
                        fontSize="16px"
                        fontFamily="inter"
                      >
                        <Trans>signOut</Trans>
                      </Text>
                    </Box>
                  </Box>

                  <Box
                    mb="19px"
                    rounded="5px"
                    display="flex"
                    alignItems="center"
                    bg="#1F1F1F"
                    textAlign="center"
                  >
                    <Box
                      w="18%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <SvgMore width="22" heigth="22" />
                    </Box>
                    <Box
                      w="90%"
                      h="50px"
                      mx="auto"
                      display="flex"
                      alignItems="center"
                      justifyContent="start"
                      pr="20px"
                    >
                      <Select
                        onChange={onChange}
                        defaultValue="Language"
                        options={[
                          { value: "en", name: "English" },
                          { value: "de", name: "Deutsch" },
                        ]}
                        value={language}
                      />
                    </Box>
                  </Box>

                  <Box
                    mb="19px"
                    rounded="5px"
                    display="flex"
                    alignItems="center"
                    bg="#1F1F1F"
                    textAlign="center"
                  >
                    <Box
                      w="18%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <SvgChange />
                    </Box>
                    <Box
                      w="90%"
                      mx="auto"
                      h="50px"
                      display="flex"
                      alignItems="center"
                      justifyContent="start"
                      pl="15px"
                      onClick={forgotPassword}
                    >
                      <Text
                        color="white"
                        fontWeight="300"
                        fontSize="16px"
                        fontFamily="inter"
                      >
                        <Trans>changePassword</Trans>
                      </Text>
                    </Box>
                  </Box>

                  <Box
                    mb="19px"
                    rounded="5px"
                    display="flex"
                    alignItems="center"
                    bg="#1F1F1F"
                    textAlign="center"
                  >
                    <Box
                      w="18%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <SvgGuest />
                    </Box>
                    <Box
                      w="90%"
                      mx="auto"
                      h="50px"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      pr="15px"
                      pl="15px"
                    >
                      <Text
                        color="white"
                        fontWeight="300"
                        fontSize="16px"
                        fontFamily="inter"
                        textAlign="center"
                      >
                        <Trans>guestLogin</Trans>
                      </Text>
                      <Switch
                        w="45px"
                        size="lg"
                        isChecked={isChecked}
                        rounded="12px"
                        colorScheme="blue"
                        onChange={(e) => activeGuestMode(e.target.checked)}
                        boxShadow="0px 10px 10px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25)"
                      />
                    </Box>
                  </Box>

                  <Box
                    rounded="5px"
                    display="flex"
                    alignItems="center"
                    bg="#1F1F1F"
                    textAlign="center"
                    onClick={handleClickForDeleteProfile}
                  >
                    <Box
                      w="18%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <SvgRedBasket width="15" heigth="21" />
                    </Box>
                    <Box
                      w="90%"
                      h="50px"
                      pl="15px"
                      mx="auto"
                      display="flex"
                      alignItems="center"
                      justifyContent="start"
                    >
                      <Text
                        color="white"
                        fontWeight="300"
                        fontSize="16px"
                        fontFamily="inter"
                      >
                        <Trans>deleteProfile</Trans>
                      </Text>
                    </Box>
                  </Box>
                </Box>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
      <Popup modal={openPopup} setModal={setOpenPopup} signOut={signOut} />
      {imageFile && (
        <Box
          pos="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="black"
          zIndex="10"
        >
          {imageFile && (
            <Box zIndex="11">
              <Box maxW="372px" mx="auto" mt="19px" mb="30px">
                <Box w="30px" h="30px" onClick={handleCencelCrop}>
                  <SvgExet />
                </Box>
              </Box>
              <Box
                display="flex"
                minH="100vh"
                justifyContent="center"
                alignItems="start"
              >
                <Box px="20px">
                  <Box h="auto" pos="relative" maxW="428px">
                    {cropData ? (
                      <Image
                        src={cropData}
                        w="100%"
                        h="448px"
                        objectFit="cover"
                      />
                    ) : (
                      <Cropper
                        ref={cropperRef}
                        src={imageFile}
                        guides={false}
                        minCropBoxWidth={428}
                        minCropBoxHeight={448}
                        minCanvasWidth={428}
                        minCanvasHeight={448}
                        style={{ width: "100%", height: "448px" }}
                      />
                    )}
                    <Box bg="#141414" mt="20px" rounded="5px">
                      {!filesId && (
                        <Input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          bg="transparent"
                          color="white"
                          fontSize="15px"
                          placeholder={`${lang === "de" ? "Titel" : "Title"}`}
                          rounded="0px"
                          fontWeight="700"
                          fontFamily="inter"
                          h="37px"
                          border={
                            textVaildate
                              ? "1px solid #FF0000"
                              : "1px solid transparent"
                          }
                          borderBottom={
                            textVaildate
                              ? "1px solid #FF0000"
                              : "1px solid #343434"
                          }
                        />
                      )}
                      <Input
                        defaultValue={text}
                        onChange={(e) => setText(e.target.value)}
                        bg="transparent"
                        color="white"
                        fontSize="15px"
                        placeholder={`${
                          lang === "de" ? "Kommentar" : "Comment"
                        }`}
                        rounded="0px"
                        fontWeight="300"
                        fontFamily="inter"
                        h="37px"
                        border={
                          textVaildate
                            ? "1px solid #FF0000"
                            : "1px solid transparent"
                        }
                      />
                    </Box>
                  </Box>
                  <Box
                    maxW="500px"
                    display="flex"
                    justifyContent="space-between"
                    mx="auto"
                    gap="2px"
                    mt="20px"
                  >
                    <Button
                      textColor="white"
                      bg="#0B6CFF"
                      fontSize="16px"
                      fontWeight="600"
                      w="100%"
                      h="35px"
                      rounded="7px"
                      onClick={() => getCropData()}
                    >
                      <Trans>upload</Trans>
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
      {pdfIncludes && (
        <Box
          pos="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="black"
          zIndex="11"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box w="100%">
            <Box maxW="372px" mx="auto" mt="19px" mb="30px">
              <Box w="30px" h="30px" onClick={handleCloseModal}>
                <SvgExet />
              </Box>
            </Box>
            <Box maxW="428px" mx="auto" px="13px" rounded="5px">
              <Box
                h="237px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                bg="#1A1A1A"
                mb="6px"
              >
                <SvgPdf />
              </Box>
              <Box mx="auto" bg="#141414" mt="20px" rounded="5px">
                {!filesId && (
                  <Input
                    defaultValue={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fontSize="15px"
                    placeholder="Title..."
                    textColor="white"
                    roundedTop="5px"
                    fontWeight="700"
                    fontFamily="inter"
                    h="37px"
                    border={
                      textVaildate
                        ? "1px solid #FF0000"
                        : "1px solid transparent"
                    }
                    borderBottom={
                      textVaildate ? "1px solid #FF0000" : "1px solid #343434"
                    }
                  />
                )}

                <Input
                  defaultValue={text}
                  onChange={(e) => setText(e.target.value)}
                  bg="transparent"
                  textColor="white"
                  fontSize="15px"
                  placeholder={`${lang === "de" ? "Kommentar" : "Comment"}`}
                  roundedBottom="5pxpx"
                  fontWeight="300"
                  fontFamily="inter"
                  border={
                    textVaildate ? "1px solid #FF0000" : "1px solid #141414"
                  }
                />
              </Box>

              <Box
                maxW="500px"
                display="flex"
                justifyContent="space-between"
                mx="auto"
                gap="2px"
                mt="20px"
              >
                {filesId ? (
                  <Button
                    textColor="white"
                    bg="#0B6CFF"
                    fontSize="16px"
                    fontWeight="600"
                    w="100%"
                    h="35px"
                    rounded="7px"
                    onClick={() => handlePostMoreFiles()}
                  >
                    <Trans>done</Trans>
                  </Button>
                ) : (
                  <Button
                    textColor="white"
                    bg="#0B6CFF"
                    fontSize="16px"
                    fontWeight="600"
                    w="100%"
                    h="35px"
                    rounded="7px"
                    onClick={() => handlePostFiles()}
                  >
                    <Trans>done</Trans>
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </AnimatePresence>
  );
}
