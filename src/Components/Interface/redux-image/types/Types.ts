export enum InterfaceImageTypes {
  USER_FILE = "USER_FILE",
  USER_FILES = "USER_FILES",
  USER_ALL_FILES = "USER_ALL_FILES",
  USER_FILES_INFO = "USER_IMAGES_INFO",
  USER_FILES_LOADER = "USER_FILES_LOADER",
  USER_FILES_ERROR = "USER_FILES_ERROR",
}

export interface IInfoList {
  id: string;
  text: string;
  file_url: string;
  created_date: string;
}

export interface IGroupsTypes {
  id: string;
  title: string;
  info_list: IInfoList[];
  is_akte: boolean;
}

export interface IGroupsStateTypes {
  allGroups: IGroupsTypes[];
  groups: IGroupsTypes;
  groupsInfo: IInfoList[];
  group: IInfoList;
  loading: boolean;
  error: string | any | null;
}

interface IGetActionAllGroups {
  type: InterfaceImageTypes.USER_ALL_FILES;
  payload: IGroupsTypes[];
}

interface IGetActionGroupsInfo {
  type: InterfaceImageTypes.USER_FILES_INFO;
  payload: IInfoList[];
}

interface IGetActionGroups {
  type: InterfaceImageTypes.USER_FILES;
  payload: IGroupsTypes;
}

interface IGetActionGroup {
  type: InterfaceImageTypes.USER_FILE;
  payload: IInfoList;
}

interface IActionLoaderGroup {
  type: InterfaceImageTypes.USER_FILES_LOADER;
  payload: boolean;
}

interface IActionErrorGroups {
  type: InterfaceImageTypes.USER_FILES_ERROR;
  payload: string | unknown;
}

export type ActionsGroup =
  | IActionErrorGroups
  | IActionLoaderGroup
  | IGetActionAllGroups
  | IGetActionGroup
  | IGetActionGroupsInfo
  | IGetActionGroups;
