export enum PopupTypesFormEssage {
  ERROR = "ERROR",
  UPLOAD = "UPLOAD",
  SUCCESS = "SUCCESS",
  RESSET_PASSWORD = "RESSET_PASSWORD",
  ERROR_MESSENGERS = "ERROR_MESSENGERS",
  SUCCESS_MESSENGERS = "SUCCESS_MESSENGERS",
}

export interface ISuccessMessengers {
  title: string;
  desc: string;
}
export interface initialPopupMessageState {
  successMessenger: ISuccessMessengers;
  reset_password: boolean;
  errorMessenger: string;
  success: boolean;
  upload: boolean;
  error: boolean;
}

interface IActionPopupMessageSuccess {
  type: PopupTypesFormEssage.SUCCESS;
  payload: boolean;
}

interface IActionPopupMessageError {
  type: PopupTypesFormEssage.ERROR;
  payload: boolean;
}

interface IActionPopupMessageUpload {
  type: PopupTypesFormEssage.UPLOAD;
  payload: boolean;
}

interface IActionPopupMessageResetPassword {
  type: PopupTypesFormEssage.RESSET_PASSWORD;
  payload: boolean;
}

interface IActionPopupErrorsMessenger {
  type: PopupTypesFormEssage.ERROR_MESSENGERS;
  payload: string;
}

interface IActionPopupSuccessMessengers {
  type: PopupTypesFormEssage.SUCCESS_MESSENGERS;
  payload: ISuccessMessengers;
}

export type ActionTypesPopupMessage =
  | IActionPopupMessageError
  | IActionPopupMessageResetPassword
  | IActionPopupMessageSuccess
  | IActionPopupMessageUpload
  | IActionPopupErrorsMessenger
  | IActionPopupSuccessMessengers;
