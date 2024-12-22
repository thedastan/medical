/* External dependencies */
import { Box, Text } from "@chakra-ui/react";
import { Button, Input, Spinner } from "@chakra-ui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Trans } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import SvgPdf from "../../assets/svg/SvgPdf";

/* Local dependencies */
import SvgDot from "../../assets/svg/SvgDot";
import Card from "../../Components/Ui/Card/Card";
import { API_ADDRESS } from "../../Api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import "swiper/css";
import "swiper/css/pagination";

import {
  useActionsFile,
  useActionsForModal,
  useActionsUser,
} from "../../Hooks/useActions";
import { useAppSelector } from "../../Hooks/Hooks";
import { IInterfaceUser } from "../../Components/Interface/redux/types/Types";
import {
  IGroupsTypes,
  IInfoList,
} from "../../Components/Interface/redux-image/types/Types";
import SvgBluePluse from "../../assets/svg/SvgBluePlus";
import SvgRedBasket from "../../assets/svg/SvgRedBasket";
import PopupForCard from "../../Components/Ui/Card/popyp/PopupForCard";
import PopupForMessage from "../../Components/Ui/popups/PopupForMessage";
import Fancybox from "../../Components/Fancybox/Fancybox";
import axios from "axios";

interface IGroupType {
  id: string;
  title?: string;
  info_list?: IInfoList[];
  is_akte?: boolean;
}

// SwiperCore.use([Pagination]);

export default function Akte() {
  const { allGroups, groups, group } = useAppSelector(
    (state) => state.filesReducer
  );
  const { bearbeitenAkte, loading, user, error } = useAppSelector(
    (state) => state.userReducer
  );
  const { verifay } = useAppSelector((state) => state.reducerHelpers);
  const language = localStorage.getItem("language") as string;
  const textareaRef = useRef(null);
  const {
    ActionFilesId,
    ActionActiveModalMedia,
    ActionActiveSubtrac,
    ActionActiveProfile,
  } = useActionsForModal();
  const { ActionGetUser, ActionPutUser, ActionBearbeitenAkte } =
    useActionsUser();
  const {
    ActionAllGroups,
    ActionAllGroupsPut,
    ActionGroups,
    ActionGroup,
    ActionGroupsForAkte,
    ActionGroupsForGuest,
    ActionGroupPut,
  } = useActionsFile();

  const { id } = useParams<string>();
  const ref = useRef() as any;
  const [idFile, setIdFile] = useState("");
  const [idFiles, setIdFiles] = useState("");
  const [back, setBack] = useState(false);
  const [dataPost, setDataPost] = useState<IInterfaceUser>({});
  const [deleteImg, setDeleteImg] = useState(false);
  const [names, setNames] = useState({ vorname: "", nachname: "" });
  const [popup, setPopup] = useState(false);
  const [deleteCard, setDeleteCard] = useState(false);
  const [disabledFiles, setDisabledFiles] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [groupId, setGroupId] = useState("");

  const guest_id = sessionStorage.getItem("guestId") as string;
  const allergiesH_Akte = localStorage.getItem("allergiesH_Akte") as string;
  const why_diagnoseH_Akte = localStorage.getItem(
    "why_diagnoseH_Akte"
  ) as string;
  const operationH_Akte = localStorage.getItem("operationH_Akte") as string;
  const medicationsH_Akte = localStorage.getItem("medicationsH_Akte") as string;
  const professionH_Akte = localStorage.getItem("professionH_Akte") as string;
  const locationH_Akte = localStorage.getItem("locationH_Akte") as string;

  let idGroup: any;
  const dots: any[] = [];

  for (let i = 0; i < 3; i++) {
    dots.push(<SvgDot key={i} />);
  }

  const listInput = [
    {
      item: "allergies",
      name: "allergies",
      value: dataPost.allergies || user.allergies,
      height: allergiesH_Akte,
    },
    {
      item: "diagnosen",
      name: "why_diagnose",
      value: dataPost.why_diagnose || user.why_diagnose,
      height: why_diagnoseH_Akte,
    },
    {
      item: "operationen",
      name: "operation",
      value: dataPost.operation || user.operation,
      height: operationH_Akte,
    },
    {
      item: "medicamentPlan",
      name: "medications",
      value: dataPost.medications || user.medications,
      height: medicationsH_Akte,
    },
    {
      item: "nebenDiagnosen",
      name: "profession",
      value: dataPost.profession || user.profession,
      height: professionH_Akte,
    },
    {
      item: "location",
      name: "location",
      value: dataPost.location || user.location,
      height: locationH_Akte,
    },
  ];

  const inputChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
    localStorage.setItem(`${name + "H_Akte"}`, `${e?.target?.scrollHeight}`);

    setDataPost({ ...dataPost, [e.target.name]: e.target.value });
  };

  function changeForName(vor: string, nach: string) {
    setNames({ ...names, nachname: nach, vorname: vor });

    setDataPost({
      ...dataPost,
      full_name: `${vor || user.full_name?.split(" ")[0] || names.vorname} ${
        nach || user.full_name?.split(" ")[1] || names.nachname
      }`,
    });
  }

  function deletedImage(data: IGroupType, idInfo?: string) {
    setPopup(true);
    setIdFile(idInfo ? idInfo : "");
    setIdFiles(data.id);
  }

  function handleClickPut() {
    ActionBearbeitenAkte(!bearbeitenAkte);
    ActionPutUser(window.location.pathname.slice(6), {
      allergies: dataPost.allergies || user.allergies,
      allergies_text: dataPost.allergies_text || user.allergies_text,
      avatar: dataPost.avatar || user.avatar?.slice(6) || "",
      card_id: user.card_id || id,
      contact: dataPost.contact || user.contact || "",
      email: dataPost.email || user.email,
      birth_date: dataPost.birth_date || user.birth_date || null,
      emergency_contact:
        dataPost.emergency_contact || user.emergency_contact || "",
      medications: dataPost.medications || user.medications,
      operation: dataPost.operation || user.operation,
      particularities: dataPost.particularities || user.particularities,
      profession: dataPost.profession || user.profession,
      full_name: dataPost.full_name || user.full_name || "",
      username: dataPost.full_name || user.full_name || "",
      why_diagnose: dataPost.why_diagnose || user.why_diagnose,
      location: dataPost.location || user.location || "",
    });
  }

  const BackSpaceFn = (e: any) => {
    e.key === "Backspace" ? setBack(true) : setBack(false);
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const regex = /^[0-9\b]+$/;
    let value = e.target.value;

    if (value === "" || regex.test(value)) {
      if (value.length === 4 && !back) {
        value += "-";
      } else if (value.length === 7 && !back) {
        value += "-";
      }
    }

    setDataPost({ ...dataPost, [e.target.name]: value });
  };

  const handleClick = (id: string, idInfo: string, data: IGroupsTypes) => {
    setDisabledFiles(!disabledFiles);
    ActionGroup(data.id, idInfo);
    setDeleteImg(!deleteImg);
    setIdFile(idInfo);
    ActionFilesId(id);
    setIdFiles(data.id);
  };

  const handleViewImage = (id: string) => {
    let idGroup = sessionStorage.getItem(`${id}`);

    Number(idGroup) === Number(id)
      ? console.log("Block")
      : axios.post(`${API_ADDRESS}groups/${id}/view/?g_id=${guest_id}`);

    setTimeout(() => {
      sessionStorage.setItem(`${id}`, id);
    }, 500);

    setTimeout(() => {
      sessionStorage.removeItem(`${idGroup}`);
    }, 60 * 60 * 1000);
  };

  const handlePutFile = () => {
    if (title) {
      ActionAllGroupsPut(idFiles, {
        id: groups.id,
        title: title,
        info_list: groups?.info_list.map((el) => el.id),
        is_akte: true,
      });
    }

    ActionGroupPut(
      idFiles,
      group.id,
      {
        file_url: group.file_url,
        text: text || group.text,
        id: group.id,
        created_date: group.created_date,
      },
      setText
    );

    setDisabledFiles(!disabledFiles);
    setDeleteImg(!deleteImg);
    ActionGroups(groups.id);
    ActionAllGroups();
    setIdFiles("");
    setIdFile("");
  };

  useEffect(() => {
    if (idGroup) {
      setTimeout(() => {
        sessionStorage.removeItem(`${idGroup}`);
      }, 60 * 60 * 1000);
    }
  });

  useEffect(() => {
    ActionGetUser(id);
    ActionAllGroups();

    if ((user.guest_mode && guest_id !== null) || undefined) {
      ActionGroupsForGuest(window.location.pathname.slice(6), guest_id);
    }
  }, []);

  useEffect(() => {
    if (idFile) {
      ActionGroups(idFile);
      ActionGroupsForAkte(idFile);
    }
  }, [idFile]);

  useEffect(() => {
    if (deleteCard) {
      ActionAllGroups();
      ActionGroups(idFile || groups.id);
    }
  }, [deleteCard]);

  if (loading) {
    return (
      <Box textColor="white" display="flex" justifyContent="center">
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        textColor="white"
        textAlign="center"
        display="flex"
        justifyContent="center"
      >
        Error <Text pl="5px">{`${error}`}</Text>
      </Box>
    );
  }

  return (
    <Fragment>
      <Box position="relative">
        <Box className="header-name">
          <Text
            color="white"
            fontFamily="inter"
            textAlign="center"
            mt="48px"
            mb="6px"
            fontSize="23px"
            fontWeight="700"
          >
            <Trans>patientRecord</Trans>
          </Text>

          <Text color="#C7C4C4" textAlign="center" fontSize="18px" mb="35px">
            medical
            <span style={{ color: "#E11F26" }}>switzerland</span>
          </Text>
          <Box
            display="flex"
            justifyContent="center"
            pb="11px"
            borderBottom="1px solid #454545"
            mb="29px"
            mx="13px"
          >
            {verifay && bearbeitenAkte && (
              <Button
                bg="#0B6CFF"
                fontSize="16px"
                fontFamily="inter"
                rounded="7px"
                h="37px"
                w="100%"
                color="white"
                onClick={() =>
                  !bearbeitenAkte
                    ? console.log("beiten")
                    : ActionBearbeitenAkte(!bearbeitenAkte)
                }
              >
                <Trans>editProfile</Trans>
              </Button>
            )}
          </Box>
        </Box>

        <Box px="0">
          {!bearbeitenAkte ? (
            <Box
              display="flex"
              gap="7px"
              borderBottom="1px solid #454545"
              marginBottom="29px"
            >
              <Box w="50%">
                <Text
                  color="gray"
                  fontSize="13px"
                  fontWeight="700"
                  fontFamily="inter"
                  mb="3px"
                >
                  <Trans>firstName</Trans>
                </Text>
                <textarea
                  onChange={(e) =>
                    changeForName(e.target.value, names.nachname)
                  }
                  value={
                    names.vorname
                      ? names.vorname
                      : user.full_name?.split(" ")[0]
                  }
                  disabled={bearbeitenAkte}
                  className={`textarea--notfall ${
                    !bearbeitenAkte ? "active" : ""
                  }`}
                  style={{ textAlign: "center", paddingTop: "25px" }}
                />
              </Box>
              <Box w="50%">
                <Text
                  color="gray"
                  fontSize="13px"
                  fontWeight="700"
                  fontFamily="inter"
                  mb="3px"
                >
                  <Trans>lastName</Trans>
                </Text>
                <textarea
                  onChange={(e) => changeForName(names.vorname, e.target.value)}
                  defaultValue={
                    user.full_name?.split(" ")[1]
                      ? user.full_name?.split(" ")[1]
                      : names.nachname
                  }
                  disabled={bearbeitenAkte}
                  className={`textarea--notfall ${
                    !bearbeitenAkte ? "active" : ""
                  }`}
                  style={{ textAlign: "center", paddingTop: "25px" }}
                />
              </Box>
            </Box>
          ) : (
            <Box gap="7px" w="100%">
              <Box
                borderBottom="1px solid #454545"
                marginBottom="29px"
                mx="13px"
              >
                <Text
                  color="gray"
                  fontSize="13px"
                  fontWeight="700"
                  fontFamily="inter"
                  mb="3px"
                  textAlign="center"
                >
                  NAME
                </Text>
                <textarea
                  name="full_name"
                  ref={textareaRef}
                  disabled={bearbeitenAkte}
                  onChange={(e) => inputChange(e, `full_name`)}
                  value={
                    names.vorname
                      ? `${names.vorname} ${names.nachname}`
                      : user.full_name
                      ? user.full_name
                      : ""
                  }
                  className={`textarea--akte ${
                    !bearbeitenAkte ? "active" : ""
                  }`}
                />
              </Box>
            </Box>
          )}

          <Box borderBottom="1px solid #454545" marginBottom="29px" mx={"13px"}>
            <Text
              color="gray"
              fontSize="13px"
              fontWeight="700"
              fontFamily="inter"
              mb="3px"
              textAlign="center"
            >
              <Trans>dateOfBrith</Trans>
            </Text>

            <textarea
              name="birth_date"
              defaultValue={
                dataPost.birth_date
                  ? dataPost.birth_date
                  : user.birth_date || ""
              }
              maxLength={10}
              disabled={bearbeitenAkte}
              className={`textarea--akte ${!bearbeitenAkte ? "active" : ""}`}
              onChange={(e) => handleBirthDateChange(e)}
              onKeyDown={(e) => BackSpaceFn(e)}
            />
          </Box>

          {listInput.map((el, index) => (
            <Box
              key={index}
              borderBottom={
                listInput.length - 1 === index ? "0px" : "1px solid #454545"
              }
              marginBottom="29px"
              mx="13px"
            >
              <Text
                color="gray"
                fontSize="13px"
                fontWeight="700"
                fontFamily="inter"
                mb="15px"
                mt="10px"
                textAlign="center"
              >
                <Trans>{el.item}</Trans>
              </Text>
              {!bearbeitenAkte ? (
                <textarea
                  name={el.name}
                  ref={textareaRef}
                  disabled={bearbeitenAkte}
                  onChange={(e) => inputChange(e, `${el.name}`)}
                  defaultValue={el.value ? el.value : ""}
                  className={`textarea--akte ${
                    !bearbeitenAkte ? "active" : ""
                  }`}
                  style={{ height: `${el.height}px` }}
                />
              ) : (
                <Box mb="50px">
                  {el.value ? (
                    el.value.split("\n").map((item, index) => (
                      <Text
                        textAlign={"center"}
                        style={{ color: "white" }}
                        key={index}
                        fontFamily={"inter"}
                        fontSize={"17px"}
                        marginBottom={"10px"}
                        lineHeight="16px"
                      >
                        {item === "" ? <Box h="10px" /> : item}
                      </Text>
                    ))
                  ) : (
                    <textarea
                      name={el.name}
                      onChange={(e) => inputChange(e, `${el.name}`)}
                      defaultValue={el.value ? el.value : ""}
                      disabled={bearbeitenAkte}
                      className={`textarea--notfall ${
                        !bearbeitenAkte ? "active" : ""
                      }`}
                      style={{ height: `${el.height}px` }}
                    />
                  )}
                </Box>
              )}
            </Box>
          ))}

          <Box display="flex" flexDir="column-reverse">
            {allGroups
              .filter((elem) => elem.is_akte)
              .map((el, index) => {
                const smm = Math.ceil(el?.info_list.length / 2);

                return (
                  <Box key={index} w="100%" mx="auto">
                    <Box>
                      <Fancybox
                        options={{
                          Carousel: {
                            infinite: false,
                          },
                          Fullscreen: {
                            autoStart: false,
                          },
                            // @ts-ignore
                          Slideshow: false,
                          Toolbar: false,
                        }}
                      >
                        <Swiper
                          modules={[Pagination]}
                          className="swiper"
                          style={{
                            // @ts-ignore
                            "--swiper-pagination-color": "rgb(0, 183, 255)",
                            "--swiper-pagination-bullet-inactive-color":
                              "white",
                            "--swiper-pagination-bottom": "190px",
                            "--swiper-pagination-bullet-inactive-opacity": ".5",
                            "--swiper-pagination-bullet-size": "10px",
                          }}
                          pagination={{
                            clickable: true,
                          }}
                        >
                          {el?.info_list
                            .slice(0, smm + 1)
                            .map((item, index) => {
                              return (
                                <SwiperSlide>
                                  <Box
                                    key={index}
                                    h="620px"
                                    position="relative"
                                  >
                                    <Box
                                      maxW="426px"
                                      mx="auto"
                                      h="448px"
                                      bg="#000000"
                                      display="flex"
                                      alignItems="center"
                                    >
                                      {verifay && (
                                        <Button
                                          position="absolute"
                                          display="flex"
                                          right="11px"
                                          rounded="1px"
                                          top="17px"
                                          zIndex="5"
                                          p="4px"
                                          ml="3px"
                                          w="50px"
                                          h="20px"
                                          px="0"
                                          gap={"6px"}
                                          onClick={() => {
                                            handleClick(el.id, item.id, el);
                                            setGroupId(el.id);
                                          }}
                                        >
                                          {dots}
                                        </Button>
                                      )}
                                      {groupId === el.id && deleteImg && (
                                        <Box
                                          bg="rgba(57, 57, 57, 0.5)"
                                          w="64px"
                                          h="190px"
                                          alignItems="center"
                                          pos="absolute"
                                          display="flex"
                                          flexDir="column"
                                          rounded="5px"
                                          right="5px"
                                          top="40px"
                                          zIndex="5"
                                        >
                                          <Box
                                            justifyContent="center"
                                            alignItems="center"
                                            pos="absolute"
                                            display="flex"
                                            rounded="50%"
                                            top="25px"
                                            bg="black"
                                            zIndex="5"
                                            w="39px"
                                            h="39px"
                                            onClick={() =>
                                              deletedImage(el, item.id)
                                            }
                                          >
                                            <SvgRedBasket />
                                          </Box>
                                          <Text
                                            fontSize="10px"
                                            fontWeight="300"
                                            textColor="white"
                                            fontFamily="inter"
                                            pos="absolute"
                                            right="16px"
                                            top="71px"
                                          >
                                            <Trans>delete</Trans>
                                          </Text>
                                          <Box
                                            justifyContent="center"
                                            alignItems="center"
                                            pos="absolute"
                                            display="flex"
                                            rounded="50%"
                                            right="11px"
                                            top="100px"
                                            bg="black"
                                            zIndex="5"
                                            w="39px"
                                            h="39px"
                                            onClick={() => {
                                              ActionActiveModalMedia(true);
                                              ActionActiveProfile(false);
                                              ActionActiveSubtrac(true);
                                              ActionFilesId(el.id);
                                            }}
                                          >
                                            <SvgBluePluse />
                                          </Box>
                                          <Text
                                            fontSize="10px"
                                            fontWeight="300"
                                            textColor="white"
                                            fontFamily="inter"
                                            pos="absolute"
                                            top="145px"
                                            textAlign="center"
                                          >
                                            <Trans>addMore</Trans>
                                          </Text>
                                        </Box>
                                      )}
                                      <Box w="100%">
                                        <Box
                                          w="100%"
                                          mb="7px"
                                          onClick={() => {
                                            user.guest_mode
                                              ? handleViewImage(el.id)
                                              : console.log(
                                                  "not active guest mode"
                                                );
                                          }}
                                        >
                                          {item.file_url?.slice(-3) === "png" ||
                                          item.file_url?.slice(-3) === "pdf" ? (
                                            <a
                                              data-fancybox={"gallery"}
                                              href={`${API_ADDRESS?.substring(
                                                0,
                                                34
                                              )}${item.file_url}`}
                                              ref={ref}
                                            >
                                              <Card key={index} el={item} />
                                            </a>
                                          ) : (
                                            <a
                                              href={`${API_ADDRESS?.substring(
                                                0,
                                                34
                                              )}${item.file_url}`}
                                              target="_blank"
                                            >
                                              <Box
                                                w="100%"
                                                h="448px"
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                              >
                                                <SvgPdf />
                                              </Box>
                                            </a>
                                          )}
                                        </Box>
                                      </Box>
                                    </Box>
                                    <Box
                                      mx="10px"
                                      bg={
                                        disabledFiles && idFiles === el.id
                                          ? "#141414"
                                          : "black"
                                      }
                                      rounded="5px"
                                      px="4px"
                                      mb="7px"
                                      mt="25px"
                                    >
                                      <Input
                                        borderBottom="1px solid #343434"
                                        borderRight="transparent"
                                        borderLeft="transparent"
                                        defaultValue={el.title}
                                        borderTop="transparent"
                                        disabled={!deleteImg}
                                        placeholder={
                                          disabledFiles && idFiles === el.id
                                            ? `${
                                                language === "de"
                                                  ? "Titel"
                                                  : "Title"
                                              }`
                                            : ""
                                        }
                                        fontFamily="inter"
                                        textColor="white"
                                        fontWeight="700"
                                        bg="transparent"
                                        fontSize="15px"
                                        outline="black"
                                        rounded="0px"
                                        name="text"
                                        mt={"-7px"}
                                        w="100%"
                                        mb="5px"
                                        h="37px"
                                        pl="0"
                                        onChange={(e) =>
                                          setTitle(e.target.value)
                                        }
                                      />
                                      <Input
                                        disabled={
                                          !disabledFiles || idFiles !== el.id
                                        }
                                        placeholder={
                                          disabledFiles && idFiles === el.id
                                            ? `${
                                                language === "de"
                                                  ? "Beschreibung"
                                                  : "Description"
                                              }`
                                            : ""
                                        }
                                        value={
                                          dataPost.id === item.id
                                            ? text || item.text
                                            : item.text
                                        }
                                        borderColor="transparent"
                                        fontFamily="inter"
                                        textColor="white"
                                        bg="transparent"
                                        fontWeight="300"
                                        fontSize="15px"
                                        outline="black"
                                        rounded="0px"
                                        name="text"
                                        pl="0"
                                        w="100%"
                                        mb="7px"
                                        h="37px"
                                        onChange={(e) => {
                                          setText(e.target.value);
                                          setDataPost({
                                            ...dataPost,
                                            id: item.id,
                                          });
                                        }}
                                      />
                                      <Text
                                        textColor="#fff"
                                        fontFamily="commissioner"
                                        fontSize="10px"
                                        fontWeight="300"
                                        textAlign="start"
                                      >
                                        {`${item.created_date
                                          .split("-")
                                          .reverse()
                                          .join(".")}`}
                                      </Text>
                                    </Box>
                                    {groupId === el.id && deleteImg && (
                                      <Box display="flex" w="100%">
                                        <Button
                                          color="white"
                                          fontSize="16px"
                                          fontWeight="700"
                                          fontFamily="inter"
                                          bg="#0B6CFF"
                                          w="100%"
                                          h="35px"
                                          ml="2px"
                                          rounded="7px"
                                          onClick={() => handlePutFile()}
                                        >
                                          <Trans>done</Trans>
                                        </Button>
                                      </Box>
                                    )}
                                  </Box>
                                </SwiperSlide>
                              );
                            })}
                        </Swiper>
                      </Fancybox>
                    </Box>
                  </Box>
                );
              })}
          </Box>
        </Box>

        {!bearbeitenAkte && (
          <Box
            position="fixed"
            mx="auto"
            bottom="100px"
            px="41px"
            w="100%"
            zIndex="5"
          >
            <Button
              bg="#0B6CFF"
              fontSize="16px"
              fontFamily="inter"
              rounded="7px"
              h="37px"
              w="100%"
              color="white"
              onClick={() => handleClickPut()}
            >
              <Trans>done</Trans>
            </Button>
          </Box>
        )}
      </Box>

      <PopupForCard
        setDeleteCard={setDeleteCard}
        id={idFiles}
        modal={popup}
        setModal={setPopup}
        idInfo={idFile}
      />
      <PopupForMessage />
    </Fragment>
  );
}
