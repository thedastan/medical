// External dependencies
import { Box, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

/* Local dependencies */
import SvgAkte from "../../../assets/svg/SvgAkte";
import SvgPhone from "../../../assets/svg/SvgPhone";
import Registration from "../../Registration/Registration";
import {
  useActionsAuth,
  useActionsForModal,
  useActionsGuest,
  useActionsUser,
} from "../../../Hooks/useActions";
import { useAppSelector } from "../../../Hooks/Hooks";
import { Trans, useTranslation } from "react-i18next";
import GeustMode from "../../GuestMode/GuestMode";

enum TabTypes {
  NOTFALL = "NOTFALL",
  AKTE = "AKTE",
}

interface ITabs {
  akte: JSX.Element;
  notfall: JSX.Element;
}

export default function Tabs({ akte, notfall }: ITabs) {
  const { t } = useTranslation();

  const { ActionGuestActiveModa } = useActionsGuest();
  const { ActionGetUser } = useActionsUser();
  const { ActionActiveIsAkte } = useActionsForModal();
  const { ActiveModalRegistration } = useActionsAuth();

  const { user } = useAppSelector((state) => state.userReducer);
  const { modal } = useAppSelector((state) => state.authReducer);
  const { idGuest } = useAppSelector((state) => state.guestReducer);
  const { verifay } = useAppSelector((state) => state.reducerHelpers);

  const [isActive, setActive] = useState(TabTypes.NOTFALL);

  const isNotfall = isActive === TabTypes.NOTFALL;
  const isAkte = isActive === TabTypes.AKTE;

  const guest_id = sessionStorage.getItem("guestId") as string;

  const handleActiveAuth = () => {
    if (user.is_first_time || !verifay) {
      if (user.guest_mode) {
        if (idGuest || guest_id) {
          setActive(TabTypes.AKTE);
        } else {
          ActionGuestActiveModa(true);
        }
      } else {
        ActiveModalRegistration(true);
      }
    } else {
      setActive(TabTypes.AKTE);
      ActiveModalRegistration(false);
      ActionActiveIsAkte(true);
    }
  };

  const handleClickNotfall = () => {
    setActive(TabTypes.NOTFALL);
    ActionActiveIsAkte(false);
  };

  useEffect(() => {
    ActionGetUser(window.location.pathname.slice(6));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      sessionStorage.removeItem("guestId");
    }, 60 * 60 * 10000);
  }, [idGuest]);

  return (
    <Box>
      <Box maxW="900px" mx="auto" mt="10px"  p="0 15px" display="flex" justifyContent="space-between"  mb="24px">
        <Button
          bg="#1A1A1A"
          w="48%"
          textColor="white"
          display="flex"
          h="44px"
          rounded="7px"
          position="static"
          boxShadow={"inset 0px 2px 2px rgba(31, 31, 31, 0.44)"}
          onClick={handleClickNotfall}
          borderBottom={isNotfall ? "0.5px solid white" : "0.5px solid black"}
        >
          <SvgPhone />
          <Text  ml="5px" letterSpacing="1px" fontFamily="Helvetica" fontSize="11px" fontWeight="500">
            <Trans>emergency</Trans>
          </Text>

        </Button>
        <Button
          bg="#1A1A1A"
          w="48%"
          textColor="white"
          display="flex"
          h="44px"
          rounded="7px"
          position="static"
          whiteSpace="initial"
          p="0 5px"
          boxShadow={"inset 0px 2px 2px rgba(31, 31, 31, 0.44)"}
          onClick={handleActiveAuth}
          borderBottom={isAkte ? "0.5px solid white" : "0.5px solid black"}
        >
          <SvgAkte />
          <Text  ml="5px" letterSpacing="1px" fontFamily="Helvetica" fontSize="11px" fontWeight="500">
            <Trans>medicall</Trans>
          </Text>
        </Button>
      </Box>
      <Box maxW="900px" mx="auto">
        {isNotfall ? notfall : akte}
      </Box>
      {modal && <Registration />}
      <GeustMode />
    </Box>
  );
}
