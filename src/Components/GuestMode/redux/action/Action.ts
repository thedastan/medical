import { ActionGuest, IGuestTypes } from "../types/Types";

export const ActionGuestActiveModa = (payload: boolean): ActionGuest => {
  return { type: IGuestTypes.MODAL_GUEST, payload };
};

export const ActionGetGuestId = (payload: string): ActionGuest => {
  return { type: IGuestTypes.GUEST_ID, payload };
};

export const ActionGuestActiveSuccessModal = (
  payload: boolean
): ActionGuest => {
  return { type: IGuestTypes.MODAL_SUCCESS, payload };
};
