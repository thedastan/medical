export enum AuthTypes {
  AUTH_USER = "AUTH_USER",
  AUTH_USER_ERROR = "AUTH_USER_ERROR",
  AUTH_USER_LOADER = "AUTH_USER_LOADER",

  LOGIN_USER = "LOGIN_USER",
  LOGIN_USER_ERROR = "LOGIN_USER_ERROR",
  LOGIN_USER_LOADING = "LOGIN_USER_LOADING",

  REGISTRATION_MODAL = "REGISTRATION_MODAL",
  SUCCESS_MODAL = "SUCCESS_MODAL",
}

export interface IAuthState {
  authorized: boolean;
  error: string | any | null;
  loading: boolean;

  loginLoder: boolean;
  loginError: string | any | null;

  modal: boolean;
  successPopup:boolean
}

export interface IAuthPostData {
  email: string;
  password: string;
}

interface IActionAuthSucces {
  type: AuthTypes.AUTH_USER;
  payload: boolean;
}

interface IActionAuthError {
  type: AuthTypes.AUTH_USER_ERROR;
  payload: string | unknown;
}

interface IActionAuthLoading {
  type: AuthTypes.AUTH_USER_LOADER;
  payload: boolean;
}

interface IActionLoginSuccess {
  type: AuthTypes.LOGIN_USER;
}

interface IActionLoginError {
  type: AuthTypes.LOGIN_USER_ERROR;
  payload: string | unknown;
}

interface IActionLoginLoading {
  type: AuthTypes.LOGIN_USER_LOADING;
  payload: boolean;
}

interface IActionActiveRegistratiomModal {
  type: AuthTypes.REGISTRATION_MODAL;
  payload: boolean;
}

interface IActionSuccessPopup {
  type: AuthTypes.SUCCESS_MODAL;
  payload: boolean;
}

export type ActionTypesAuth =
  | IActionAuthError
  | IActionAuthLoading
  | IActionAuthSucces
  | IActionLoginError
  | IActionLoginLoading
  | IActionLoginSuccess
  | IActionActiveRegistratiomModal
  | IActionSuccessPopup;
