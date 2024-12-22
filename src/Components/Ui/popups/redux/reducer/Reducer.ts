import {
  ActionTypesPopupMessage,
  PopupTypesFormEssage,
  initialPopupMessageState,
} from "../types/Types";

const initialState: initialPopupMessageState = {
  reset_password: false,
  successMessenger: {
    desc: "",
    title: "",
  },
  errorMessenger: "",
  success: false,
  upload: false,
  error: false,
};

export const messageReducer = (
  state = initialState,
  action: ActionTypesPopupMessage
): initialPopupMessageState => {
  switch (action.type) {
    case PopupTypesFormEssage.ERROR:
      return { ...state, error: action.payload };

    case PopupTypesFormEssage.RESSET_PASSWORD:
      return { ...state, reset_password: action.payload };

    case PopupTypesFormEssage.SUCCESS:
      return { ...state, success: action.payload };

    case PopupTypesFormEssage.UPLOAD:
      return { ...state, upload: action.payload };

    case PopupTypesFormEssage.ERROR_MESSENGERS:
      return { ...state, errorMessenger: action.payload };

    case PopupTypesFormEssage.SUCCESS_MESSENGERS:
      return { ...state, successMessenger: action.payload };

    default:
      return state;
  }
};
