import { ActionsErrors, ErrorsTypes } from "../types/Types";

export const ActionActiveError500 = (payload: boolean): ActionsErrors => {
  return { type: ErrorsTypes.ERROR_500, payload };
};

export const ActionActiveError401 = (payload: boolean): ActionsErrors => {
  return { type: ErrorsTypes.ERROR_401, payload };
};
