/* External dependencies */
import { Dispatch } from "redux";
import axios from "axios";

/* Local dependencies */
import API, { API_ADDRESS } from "../../../../Api";
import { ActionsGroup, IInfoList, InterfaceImageTypes } from "../types/Types";

interface IGroupType {
  id: string;
  title: string;
  info_list: string[] | number[];
  is_akte: boolean;
}

export const ActionAllGroups = () => {
  return async (dispatch: Dispatch<ActionsGroup>) => {
    try {
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: true });
      const response = await API.get(`groups/`);
      const data = response.data;

      dispatch({ type: InterfaceImageTypes.USER_ALL_FILES, payload: data });
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: false });
    } catch (e) {
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: false });
      dispatch({ type: InterfaceImageTypes.USER_FILES_ERROR, payload: e });
    }
  };
};

export const ActionAllGroupsForCardId = (id?: string) => {
  return async (dispatch: Dispatch<ActionsGroup>) => {
    try {
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: true });
      const response = await axios.get(`${API_ADDRESS}groups/?card_id=${id}`);
      const data = response.data;

      dispatch({ type: InterfaceImageTypes.USER_ALL_FILES, payload: data });
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: false });
    } catch (e) {
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: false });
      dispatch({ type: InterfaceImageTypes.USER_FILES_ERROR, payload: e });
    }
  };
};

export const ActionGroupsInfo = (id?: string) => {
  return async (dispatch: Dispatch<ActionsGroup>) => {
    try {
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: true });
      const response = await axios.get(`${API_ADDRESS}/groups/${id}/info`);
      const data = response.data;

      dispatch({ type: InterfaceImageTypes.USER_FILES_INFO, payload: data });
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: false });
    } catch (e) {
      dispatch({ type: InterfaceImageTypes.USER_FILES_ERROR, payload: e });
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: false });
    }
  };
};

export const ActionGroups = (id?: string) => {
  return async (dispatch: Dispatch<ActionsGroup>) => {
    try {
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: true });
      const response = await axios.get(`${API_ADDRESS}groups/${id}/`);
      const data = response.data;

      dispatch({ type: InterfaceImageTypes.USER_FILES, payload: data });
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: false });
    } catch (e) {
      dispatch({ type: InterfaceImageTypes.USER_FILES_ERROR, payload: e });
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: false });
    }
  };
};

export const ActionGroupsForAkte = (id?: string) => {
  return async (dispatch: Dispatch<ActionsGroup>) => {
    try {
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: true });
      const response = await API.get(`groups/${id}/`);
      const data = response.data;

      dispatch({ type: InterfaceImageTypes.USER_FILES, payload: data });
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: false });
    } catch (e) {
      dispatch({ type: InterfaceImageTypes.USER_FILES_ERROR, payload: e });
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: false });
    }
  };
};

export const ActionGroupsForGuest = (id?: string, guestId?: string) => {
  return async (dispatch: Dispatch<ActionsGroup>) => {
    try {
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: true });
      const response = await axios.get(
        `${API_ADDRESS}groups/?card_id=${id}&&guest_id=${guestId}`
      );
      const data = response.data;

      dispatch({ type: InterfaceImageTypes.USER_ALL_FILES, payload: data });
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: false });
    } catch (e) {
      dispatch({ type: InterfaceImageTypes.USER_FILES_ERROR, payload: e });
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: false });
    }
  };
};

export const ActionGroup = (id?: string, idInfo?: string) => {
  return async (dispatch: Dispatch<ActionsGroup>) => {
    try {
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: true });
      const response = await axios.get(
        `${API_ADDRESS}groups/${id}/info/${idInfo}/`
      );
      const data = response.data;

      dispatch({ type: InterfaceImageTypes.USER_FILE, payload: data });
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: false });
    } catch (e) {
      dispatch({ type: InterfaceImageTypes.USER_FILES_ERROR, payload: e });
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: false });
    }
  };
};

export const ActionAllGroupsPut = (
  id: string,
  dataPost: IGroupType,
) => {
  return async (dispatch: Dispatch<ActionsGroup>) => {
    try {
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: true });

      const response = await API.put(`groups/${id}/`, dataPost);
      const data = response.data;

      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: false });
      dispatch({ type: InterfaceImageTypes.USER_FILE, payload: data });
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: false });
    } catch (e) {
      dispatch({ type: InterfaceImageTypes.USER_FILES_ERROR, payload: e });
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: false });
    }
  };
};

export const ActionGroupPut = (
  id: string,
  idInfo: string,
  dataPost: IInfoList,
  setText: (value: string) => void
) => {
  return async (dispatch: Dispatch<ActionsGroup>) => {
    try {
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: true });

      const response = await API.put(`groups/${id}/info/${idInfo}/`, dataPost);
      const data = response.data;
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: false });
      dispatch({ type: InterfaceImageTypes.USER_FILE, payload: data });
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: false });
      setText("");
    } catch (e) {
      dispatch({ type: InterfaceImageTypes.USER_FILES_LOADER, payload: false });
      dispatch({ type: InterfaceImageTypes.USER_FILES_ERROR, payload: e });
      setText("");
    }
  };
};

// export const ActionGroupPost = (id?: string, dataPost?: IInfoList) => {
//   return async (dispatch:Dispatch<ActionsGroup>) =>{
//     try {
//       const response = await API.post(`groups/${id}/`, dataPost);
//       const data = response.data;

//       dispatch({ type: InterfaceImageTypes.USER_FILE, payload: data });
//     } catch (e) {
//       dispatch({ type: InterfaceImageTypes.USER_FILES_ERROR, payload: e });
//     }
//   }
// };
