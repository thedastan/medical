/* External dependencies */
import axios from "axios";
import { Dispatch } from "redux";

/* Local dependencies */
import API, { API_ADDRESS } from "../../../../Api";
import { ActionTypesAuth, AuthTypes, IAuthPostData } from "../types/Types";
import { ActionTypesPopupMessage } from "../../../Ui/popups/redux/types/Types";
import { PopupTypesFormEssage } from "../../../Ui/popups/redux/types/Types";
import {
  ActionTypesUser,
  InterfaceUserTypes,
} from "../../../Interface/redux/types/Types";

export const AuthPost = (data: IAuthPostData) => {
  return async (dispatch: Dispatch<ActionTypesAuth>) => {
    try {
      dispatch({ type: AuthTypes.AUTH_USER_LOADER, payload: true });
      const response = await axios.post(`${API_ADDRESS}users/auth`, {
        email: data.email,
        password: data.password,
      });
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      dispatch({ type: AuthTypes.AUTH_USER, payload: true });
      dispatch({ type: AuthTypes.AUTH_USER_LOADER, payload: false });
    } catch (e) {
      dispatch({ type: AuthTypes.AUTH_USER_LOADER, payload: false });
      dispatch({ type: AuthTypes.AUTH_USER_ERROR, payload: e });
    }
  };
};

export const LoginPost = (id: string, data: any) => {
  return async (
    dispatch: Dispatch<
      ActionTypesAuth | ActionTypesPopupMessage | ActionTypesUser
    >
  ) => {
    try {
      dispatch({ type: InterfaceUserTypes.USER_LOADER, payload: true });
      dispatch({ type: AuthTypes.LOGIN_USER_LOADING, payload: true });

      const response = await axios.put(
        `${API_ADDRESS}users/?card_id=${id}`,
        data
      );
      const dataUser = await axios.get(`${API_ADDRESS}users/${id}/`);

      dispatch({ type: PopupTypesFormEssage.SUCCESS, payload: true });
      dispatch({ type: AuthTypes.REGISTRATION_MODAL, payload: false });

      dataUser.status === 200 ||
        (201 &&
          dispatch({ type: InterfaceUserTypes.USER_LOADER, payload: false }));
      dispatch({ type: InterfaceUserTypes.USER_LOADER, payload: false });
      dispatch({ type: InterfaceUserTypes.USERS, payload: dataUser.data });

      dispatch({ type: AuthTypes.LOGIN_USER, payload: true });
      dispatch({ type: AuthTypes.LOGIN_USER_LOADING, payload: false });
    } catch (e) {
      dispatch({ type: InterfaceUserTypes.USER_LOADER, payload: false });
      dispatch({ type: AuthTypes.LOGIN_USER_LOADING, payload: false });
      dispatch({ type: AuthTypes.LOGIN_USER_ERROR, payload: e });
    }
  };
};

export const ActiveModalRegistration = (payload: boolean): ActionTypesAuth => {
  return { type: AuthTypes.REGISTRATION_MODAL, payload };
};

export const ActiveModalSuccess = (payload: boolean): ActionTypesAuth => {
  return { type: AuthTypes.SUCCESS_MODAL, payload };
};
