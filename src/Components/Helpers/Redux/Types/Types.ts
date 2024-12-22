export enum ConstantHelpers {
  VERIFAY = "VERIFAY",
}

export interface HelpersInitial {
  verifay: boolean;
}

interface IActionVerifay {
  type: ConstantHelpers.VERIFAY;
  payload: boolean;
}

export type ActionTypesHelpers = IActionVerifay;
