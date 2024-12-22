/* External dependencies */
import axios from "axios";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { createRef, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

/* Local dependencies */
import SvgProfile from "../../assets/svg/SvgProfile";
import SvgSubtract from "../../assets/svg/SvgSubtract";
import PopupMediaFile from "./popup/PopupMediaFile";
import Registration from "../Registration/Registration";
import SVgContact from "../../assets/svg/SvgContact";
import SvgAdded from "../../assets/svg/SvgAdded";
import SvgDefaultAvatar from "../../assets/svg/SvgDefaultAvatar";
import API, { API_ADDRESS } from "../../Api";
import PopupMore from "./popup/PopupMore";

import { useAppSelector } from "../../Hooks/Hooks";
import {
  useActionsAuth,
  useActionsForModal,
  useActionsUser,
  useActionsForMessage,
  useActionsHelpers,
} from "../../Hooks/useActions";
import { dataURLtoFile, onChangeImage } from "../Helpers";
import PopupForMessage from "../Ui/popups/PopupForMessage";
import SvgExet from "../../assets/svg/SvgExit";
import { Trans, useTranslation } from "react-i18next";
import { BarLoader } from "react-spinners";

interface IInterfaceProps {
  children: JSX.Element;
}

export default function Interface({ children }: IInterfaceProps) {
  const { t } = useTranslation();

  const { ActionGetUser } = useActionsUser();
  const {
    ActionError,
    ActionErrorMessenger,
    ActionSuccess,
    ActionSuccessMessenger,
  } = useActionsForMessage();
  const {
    ActionActiveSubtrac,
    ActionActiveProfile,
    ActionActiveModalMedia,
    ActionFilesId,
  } = useActionsForModal();
  const { ActiveModalRegistration } = useActionsAuth();
  const { ActionsHelpersVerifay } = useActionsHelpers();

  const { user } = useAppSelector((state) => state.userReducer);
  const { modal } = useAppSelector((state) => state.authReducer);
  const { verifay } = useAppSelector((state) => state.reducerHelpers);
  const { subtract, more, profile } = useAppSelector(
    (state) => state.modalReducer
  );

  const { id } = useParams<string>();
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const cropperRef = createRef<ReactCropperElement>();

  const [loader, setLoader] = useState(false);
  const [cropData, setCropData] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [popupMore, setPopupMore] = useState(false);
  const [start, setStart] = useState(false);

  const handleActiveAuth = () => {
    if (user.is_first_time && !verifay) {
      ActiveModalRegistration(true);
    } else if (!user.is_first_time && !verifay) {
      ActiveModalRegistration(true);
    } else {
      ActionFilesId("");
      ActiveModalRegistration(false);
      ActionActiveModalMedia(true);
      ActionActiveProfile(false);
      ActionActiveSubtrac(true);
    }
  };

  const handleClickModalMore = () => {
    setPopupMore(true);
  };

  const handleClickModalProfile = () => {
    if (verifay) {
      ActionFilesId("");
      ActionActiveProfile(true);
      ActionActiveSubtrac(false);
      ActionActiveModalMedia(true);
    } else {
      ActiveModalRegistration(true);
    }
  };

  const handleActiveAuthAvatart = () => {
    if (!user.is_first_time && verifay) {
      ActiveModalRegistration(false);
      ref.current?.click();
    } else {
      ActiveModalRegistration(true);
    }
  };

  const getCropData = async () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  const handlePostFiles = async () => {
    const image =
      cropData &&
      dataURLtoFile(cropData, `${Math.floor(Math.random() * 100000)}.png`);

    const formData = new FormData();
    formData.append("file", image);

    setLoader(true);
    await API.post("users/upload/", formData)
      .then(({ data }) => {
        if (data) {
          // ActionPutUser(window.location.pathname.slice(6), {
          //   allergies: user.allergies,
          //   allergies_text: user.allergies_text,
          //   avatar: data?.path.slice(6) || user.avatar,
          //   birth_date: user.birth_date || null,
          //   card_id: user.card_id,
          //   contact: user.contact || "",
          //   email: user.email,
          //   emergency_contact: user.emergency_contact || "",
          //   location: user.location || "",
          //   medications: user.medications,
          //   operation: user.operation,
          //   particularities: user.particularities,
          //   profession: user.profession,
          //   username: user.username || "",
          //   full_name: user.full_name || "",
          //   why_diagnose: user.why_diagnose,
          //   guest_mode: false,
          // });
          API.put(`users/`, {
            allergies: user.allergies,
            allergies_text: user.allergies_text,
            avatar: data?.path.slice(6) || user.avatar,
            birth_date: user.birth_date || null,
            card_id: user.card_id,
            contact: user.contact || "",
            email: user.email,
            emergency_contact: user.emergency_contact || "",
            location: user.location || "",
            medications: user.medications,
            operation: user.operation,
            particularities: user.particularities,
            profession: user.profession,
            username: user.username || "",
            full_name: user.full_name || "",
            why_diagnose: user.why_diagnose,
            guest_mode: false,
          })
            .then(() => {
              setImageFile("");
              setCropData("");
              ActionGetUser(id);
              ActionSuccess(true);
              ActionSuccessMessenger({
                title: "updateAvatar",
                desc: "",
              });
              ActionGetUser(window.location.pathname?.slice(6));
              setLoader(false);
            })
            .catch(() => {
              ActionError(true);
              ActionErrorMessenger("filedToSend");
              setLoader(false);
            });
        }
      })
      .catch((e) => {
        setLoader(false);
        ActionError(true);
        ActionErrorMessenger(e);
      });
  };

  const distributionFunction = async () => {
    if (!cropData) {
      await getCropData();
    } else {
      handlePostFiles();
    }
  };

  const listNavigation = [
    {
      content: (
        <Box
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          fontFamily="inter"
          mb="8px"
          cursor="pointer"
          fontSize="10px"
          fontWeight="300"
          onClick={handleClickModalProfile}
        >
          <SvgProfile />
          <Text color="white" fontSize="15px" pt="6px">
            <Trans>profile</Trans>
          </Text>
        </Box>
      ),
    },
    {
      content: (
        <Box
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          fontFamily="inter"
          mb="8px"
          cursor="pointer"
          fontSize="10"
          fontWeight="300"
          onClick={handleActiveAuth}
        >
          <SvgSubtract />
          <Text color="white" fontSize="15px" pt="6px">
            <Trans>add</Trans>
          </Text>
        </Box>
      ),
    },
    {
      content: (
        <Box
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          fontFamily="inter"
          mb="8px"
          cursor="pointer"
          fontSize="10"
          fontWeight="300"
          onClick={handleClickModalMore}
        >
          <SVgContact />
          <Text color="white" fontSize="15px">
            <Trans>contact</Trans>
          </Text>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    ActionGetUser(id);
  }, [subtract, profile, more]);

  useEffect(() => {
    ActionsHelpersVerifay();
  }, []);

  useEffect(() => {
    ActionGetUser(window.location.pathname.slice(6));
  }, [start]);

  return (
    <Box minH="100vh" w="100%" position="relative">
      {loader && (
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
      )}
      <PopupForMessage />
      <input
        style={{ display: "none" }}
        ref={ref}
        type="file"
        accept="image/png,image/jpeg"
        onChange={(e) => onChangeImage(e, setImageFile)}
      />
      <Box pt="40px" px="16px" p="0">
        <Box mx="auto" minH="274px" bg="white" pt="80px">
          {user?.avatar ? (
            <>
              <Text
                color="#C7C4C4"
                textAlign="center"
                fontSize="30px"
                h="30px"
                mb="20px"
              >
                medical
                <span style={{ color: "#E11F26" }}>switzerland</span>
              </Text>
              <Box pos="relative" zIndex="1" w="100px" h="100px" mx="auto">
                <Image
                  src={`${API_ADDRESS?.substring(0, 35)}${user.avatar.slice(
                    1
                  )}`}
                  alt="avatar"
                  w="100px"
                  h="100px"
                  mx="auto"
                  rounded="50%"
                  objectFit="cover"
                />
                {verifay && (
                  <Box
                    pos="absolute"
                    top="10px"
                    right="-9px"
                    cursor="pointer"
                    onClick={handleActiveAuthAvatart}
                  >
                    <SvgAdded />
                  </Box>
                )}
              </Box>
            </>
          ) : (
            <Box>
              <Text
                color="#C7C4C4"
                textAlign="center"
                fontSize="30px"
                h="30px"
                mb="20px"
              >
                medical
                <span style={{ color: "#E11F26" }}>switzerland</span>
              </Text>
              <Box
                w="100px"
                h="100px"
                zIndex="2"
                mx="auto"
                mb={!verifay ? "0px" : "10px"}
                pos="relative"
              >
                <SvgDefaultAvatar />
                {verifay && (
                  <Box
                    pos="absolute"
                    top="10px"
                    right="-9px"
                    cursor="pointer"
                    onClick={handleActiveAuthAvatart}
                  >
                    <SvgAdded />
                  </Box>
                )}
              </Box>
              {user.is_first_time && (
                <Box mx="auto" bottom="100px" px="41px" w="100%">
                  <Button
                    bg="#0B6CFF"
                    fontSize="16px"
                    fontFamily="inter"
                    rounded="7px"
                    h="37px"
                    w="100%"
                    color="white"
                    onClick={() => {
                      ActiveModalRegistration(true);
                      setStart(true);
                    }}
                  >
                    START
                  </Button>
                </Box>
              )}
              {!user.is_first_time && !verifay && (
                <Box mx="auto" bottom="100px" px="41px" w="100%">
                  <Button
                    bg="#0B6CFF"
                    fontSize="16px"
                    fontFamily="inter"
                    rounded="7px"
                    h="37px"
                    w="100%"
                    color="white"
                    onClick={() => {
                      ActiveModalRegistration(true);
                    }}
                  >
                    LOGIN
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
      <Box pb="70px">{children}</Box>
      <Box
        position="fixed"
        bg="black"
        display="flex"
        justifyContent="space-between"
        alignItems="start"
        boxShadow="2px 4px 4px 2px #FFFFFF"
        mb="auto"
        w="100%"
        h="95px"
        pt="10px"
        bottom="0"
        left="0"
        right="0"
        px="31px"
        zIndex={1}
      >
        {listNavigation.map((el, index) => (
          <div key={index}>{el.content}</div>
        ))}
      </Box>
      {popupMore && <PopupMore setModal={setPopupMore} />}
      {modal && <Registration />}
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
            <Box>
              <Box
                maxW="372px"
                mx="auto"
                mt="19px"
                mb="30px"
                onClick={() => {
                  setImageFile("");
                  setCropData("");
                }}
              >
                <Box w="30px" h="30px">
                  <SvgExet />
                </Box>
              </Box>
              <Box
                mt="30%"
                zIndex="11"
                maxW="372px"
                mx="auto"
                display="flex"
                minH="100vh"
                justifyContent="center"
                alignItems="start"
                px="13px"
              >
                <Box w="100%" mx="auto">
                  {cropData ? (
                    <Box w="250px" h="250px" mx="auto">
                      <Image
                        src={cropData}
                        w="250px"
                        h="250px"
                        objectFit="cover"
                        rounded="50%"
                      />
                    </Box>
                  ) : (
                    <Box
                      h="310px"
                      pos="relative"
                      w="100%"
                      display="flex"
                      justifyContent="center"
                    >
                      <Cropper
                        ref={cropperRef}
                        src={imageFile}
                        guides={false}
                        minCropBoxWidth={300}
                        minCropBoxHeight={300}
                        minCanvasWidth={300}
                        minCanvasHeight={300}
                        style={{
                          width: "300px",
                          height: "300px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      />
                    </Box>
                  )}
                  <Box
                    maxW="500px"
                    display="flex"
                    justifyContent="space-between"
                    mx="auto"
                    gap="2px"
                    mt="30px"
                  >
                    <Button
                      textColor="white"
                      bg="#0B6CFF"
                      fontSize="16px"
                      fontWeight="600"
                      w="100%"
                      h="35px"
                      rounded="7px"
                      onClick={distributionFunction}
                    >
                      {!cropData ? (
                        <Trans>cropAvatar</Trans>
                      ) : (
                        <Trans>saveAvatar</Trans>
                      )}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
      <PopupMediaFile />
    </Box>
  );
}
