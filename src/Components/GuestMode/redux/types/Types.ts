export enum IGuestTypes {
  MODAL_GUEST = "MODAL_GUEST",
  GUEST_ID = "GUEST_ID",
  MODAL_SUCCESS = "MODAL_SUCCESS",
}

export interface initialGuestState {
  idGuest: string;
  activeModal: boolean;
  successModal: boolean;
}

interface IActiveModalGuest {
  type: IGuestTypes.MODAL_GUEST;
  payload: boolean;
}

interface IActionGetIdGuest {
  type: IGuestTypes.GUEST_ID;
  payload: string;
}

interface IActionActiveSuccessFull {
  type: IGuestTypes.MODAL_SUCCESS;
  payload: boolean;
}

export type ActionGuest =
  | IActionGetIdGuest
  | IActiveModalGuest
  | IActionActiveSuccessFull;
