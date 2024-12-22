export enum ErrorsTypes {
  ERROR_500 = "ERROR_500",
  ERROR_401 = "ERROR_401",
}

export interface initialStateErrorsTypes {
  error500: boolean;
  error400: boolean;
}

interface IActionErrors500 {
  type: ErrorsTypes.ERROR_500;
  payload: boolean;
}

interface IActionErrors401 {
  type: ErrorsTypes.ERROR_401;
  payload: boolean;
}

export type ActionsErrors = IActionErrors401 | IActionErrors500;
