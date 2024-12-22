/* Local dependencies */
import { ActionTypesAuth, AuthTypes, IAuthState } from "../types/Types";

const initalStateAuth: IAuthState = {
  authorized: false,
  error: "",
  loading: false,
  loginError: "",
  loginLoder: false,
  modal: false,
  successPopup: false,
};

export const authReducer = (
  state = initalStateAuth,
  action: ActionTypesAuth
): IAuthState => {
  switch (action.type) {
    case AuthTypes.AUTH_USER:
      return { ...state, error: "", authorized: action.payload };

    case AuthTypes.AUTH_USER_ERROR:
      return { ...state, error: action.payload };

    case AuthTypes.AUTH_USER_LOADER:
      return { ...state, loading: action.payload, error: "" };

    case AuthTypes.LOGIN_USER_LOADING:
      return { ...state, loginLoder: action.payload };

    case AuthTypes.LOGIN_USER_ERROR:
      return { ...state, loginLoder: false, loginError: action.payload };

    case AuthTypes.REGISTRATION_MODAL:
      return { ...state, modal: action.payload };

    case AuthTypes.SUCCESS_MODAL:
      return { ...state, successPopup: action.payload };

    default:
      return state;
  }
};
