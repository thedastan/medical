export enum InterfaceUserTypes {
  USERS = "USERS",
  USER_UPLOAD = "USER_UPLOAD",
  USER_ERROR = "USER_ERROR",
  USER_LOADER = "USER_LOADER",
  BEARBEITEN_NOTFALL = "BEARBEITEN_NOTFALL",
  BEARBEITEN_AKTE = "BEARBEITEN_AKTE",
}

export interface IInterfaceUser {
  id?:number | string;
  email?: string | null;
  username?: string | null;
  avatar?: string | null;
  contact?: string | null;
  birth_date?: string | null;
  allergies?: string | null;
  emergency_contact?: string | null;
  particularities?: string | null;
  operation?: string | null;
  allergies_text?: string | null;
  medications?: string | null;
  why_diagnose?: string | null;
  profession?: string | null;
  card_id?: string | null;
  is_first_time?: string | null;
  location?: string | null;
  full_name?: string | null;
  guest_mode?: boolean;
}

export interface IInterfaceUserState {
  user: IInterfaceUser;
  error: string | any | null;
  loading: boolean;
  bearbeitenNotfall: boolean;
  bearbeitenAkte: boolean;
}

interface IActionGetUser {
  type: InterfaceUserTypes.USERS;
  payload: IInterfaceUser;
}

interface IActionLoaderUser {
  type: InterfaceUserTypes.USER_LOADER;
  payload: boolean;
}

interface IActionErrorUser {
  type: InterfaceUserTypes.USER_ERROR;
  payload: string | unknown;
}

interface IActionUserPut {
  type: InterfaceUserTypes.USER_UPLOAD;
  payload: IInterfaceUser;
}

interface IActionBearbeitenNofall {
  type: InterfaceUserTypes.BEARBEITEN_NOTFALL;
  payload: boolean;
}

interface IActionBearbeitenAkte {
  type: InterfaceUserTypes.BEARBEITEN_AKTE;
  payload: boolean;
}

export type ActionTypesUser =
  | IActionErrorUser
  | IActionGetUser
  | IActionLoaderUser
  | IActionUserPut
  | IActionBearbeitenNofall
  | IActionBearbeitenAkte;
