import {
  ActionTypesPopupMessage,
  ISuccessMessengers,
  PopupTypesFormEssage,
} from "../types/Types";

export const ActionSuccess = (payload: boolean): ActionTypesPopupMessage => {
  return { type: PopupTypesFormEssage.SUCCESS, payload };
};

export const ActionError = (payload: boolean): ActionTypesPopupMessage => {
  return { type: PopupTypesFormEssage.ERROR, payload };
};

export const ActionReset = (payload: boolean): ActionTypesPopupMessage => {
  return { type: PopupTypesFormEssage.RESSET_PASSWORD, payload };
};

export const ActionUpload = (payload: boolean): ActionTypesPopupMessage => {
  return { type: PopupTypesFormEssage.UPLOAD, payload };
};

export const ActionErrorMessenger = (
  payload: string
): ActionTypesPopupMessage => {
  return { type: PopupTypesFormEssage.ERROR_MESSENGERS, payload };
};

export const ActionSuccessMessenger = (
  payload: ISuccessMessengers
): ActionTypesPopupMessage => {
  return { type: PopupTypesFormEssage.SUCCESS_MESSENGERS, payload };
};
