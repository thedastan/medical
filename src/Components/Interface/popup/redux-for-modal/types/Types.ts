export enum ModalTypes {
  MORE = "MORE",
  PROFILE = "PROFILE",
  SUBTRACT = "SUBTRACT",
  ID_FILES = "ID_FILES",
  IS_AKTE = "IS_AKTE",
  ACTIVE_MODAL_MEDIA = "ACTIVE_MODAL_MEDIA",
}

export interface InterfaceModalMediaState {
  activeMediaModal: boolean;
  subtract: boolean;
  profile: boolean;
  filesId: string;
  isAkte: boolean;
  more: boolean;
}

interface IActionFilesId {
  type: ModalTypes.ID_FILES;
  payload: string;
}

interface IActionActiveModalMedia {
  type: ModalTypes.ACTIVE_MODAL_MEDIA;
  payload: boolean;
}

interface IActionActiveSubtract {
  type: ModalTypes.SUBTRACT;
  payload: boolean;
}

interface IActionActiveProfile {
  type: ModalTypes.PROFILE;
  payload: boolean;
}

interface IActionActiveMore {
  type: ModalTypes.MORE;
  payload: boolean;
}

interface IActionActiveIsAkte {
  type: ModalTypes.IS_AKTE;
  payload: boolean;
}

export type ActionModalMediaType =
  | IActionFilesId
  | IActionActiveModalMedia
  | IActionActiveSubtract
  | IActionActiveIsAkte
  | IActionActiveMore
  | IActionActiveProfile;
