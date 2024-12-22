import axios from "axios";
import { Dispatch } from "redux";

import { API_ADDRESS } from "../../../../Api";
import { ActionTypesHelpers, ConstantHelpers } from "../Types/Types";
import { getAccessToken } from "../..";

export const ActionsHelpersVerifay = () => {
  return async (dispatch: Dispatch<ActionTypesHelpers>) => {
    try {
      const responce = await axios.post(`${API_ADDRESS}users/auth/verify/`, {
        token: getAccessToken(),
      });
      dispatch({ type: ConstantHelpers.VERIFAY, payload: true });
    } catch (e) {
      dispatch({ type: ConstantHelpers.VERIFAY, payload: false });
    }
  };
};
