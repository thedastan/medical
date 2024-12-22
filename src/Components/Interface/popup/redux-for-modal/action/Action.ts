import { ActionModalMediaType, ModalTypes } from "../types/Types";

export const ActionFilesId = (payload: string): ActionModalMediaType => {
  return { type: ModalTypes.ID_FILES, payload };
};

export const ActionActiveModalMedia = (payload: boolean): ActionModalMediaType => {
  return { type: ModalTypes.ACTIVE_MODAL_MEDIA, payload };
};

export const ActionActiveSubtrac = (payload: boolean): ActionModalMediaType => {
  return { type: ModalTypes.SUBTRACT, payload };
};

export const ActionActiveProfile = (payload: boolean): ActionModalMediaType => {
  return { type: ModalTypes.PROFILE, payload };
};

export const ActionActiveIsAkte = (payload: boolean): ActionModalMediaType => {
  return { type: ModalTypes.IS_AKTE, payload };
};

export const ACtionActiveMore = (payload: boolean): ActionModalMediaType => {
  return { type: ModalTypes.MORE, payload };
};
