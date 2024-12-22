/* External dependencies */
import { Dispatch } from "redux";

/* Local dependencies */
import {
  ActionTypesUser,
  IInterfaceUser,
  InterfaceUserTypes,
} from "../types/Types";
import API, { API_ADDRESS } from "../../../../Api";
import axios from "axios";

export const ActionGetUser = (id?: string) => {
  return async (dispatch: Dispatch<ActionTypesUser>) => {
    try {
      dispatch({ type: InterfaceUserTypes.USER_LOADER, payload: true });
      const response = await axios.get(`${API_ADDRESS}users/${id}/`);
      const data = response.data;
      response.status === 200 ||
        (201 &&
          dispatch({ type: InterfaceUserTypes.USER_LOADER, payload: false }));

      dispatch({ type: InterfaceUserTypes.USERS, payload: data });
    } catch (e) {
      dispatch({ type: InterfaceUserTypes.USER_LOADER, payload: false });
      dispatch({ type: InterfaceUserTypes.USER_ERROR, payload: e });
    }
  };
};

export const ActionPutUser = (id: string, postData?: IInterfaceUser) => {
  return async (dispatch: Dispatch<ActionTypesUser>) => {
    try {
      const response = await API.put(`users/`, postData);
      const data = response.data;
      dispatch({ type: InterfaceUserTypes.USER_UPLOAD, payload: data });
    } catch (e) {
      dispatch({ type: InterfaceUserTypes.USER_ERROR, payload: e });
    }
  };
};

export const ActionBearbeitenNotfall = (payload: boolean): ActionTypesUser => {
  return { type: InterfaceUserTypes.BEARBEITEN_NOTFALL, payload };
};

export const ActionBearbeitenAkte = (payload: boolean): ActionTypesUser => {
  return { type: InterfaceUserTypes.BEARBEITEN_AKTE, payload };
};
