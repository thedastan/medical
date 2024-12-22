import {
  ActionsErrors,
  ErrorsTypes,
  initialStateErrorsTypes,
} from "../types/Types";

const initialState: initialStateErrorsTypes = {
  error400: false,
  error500: false,
};

export const errorsReducer = (
  state = initialState,
  action: ActionsErrors
): initialStateErrorsTypes => {
  switch (action.type) {
    case ErrorsTypes.ERROR_401:
      return { ...state, error400: action.payload };

    case ErrorsTypes.ERROR_500:
      return { ...state, error500: action.payload };

    default:
      return state;
  }
};
