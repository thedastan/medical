import {
  ActionsGroup,
  IGroupsStateTypes,
  InterfaceImageTypes,
} from "../types/Types";

const initalStateImages: IGroupsStateTypes = {
  allGroups: [],
  error: "",
  group: {
    id: "",
    file_url: "",
    text: "",
    created_date: "",
  },
  groups: {
    id: "",
    info_list: [],
    title: "",
    is_akte: false,
  },
  groupsInfo: [],
  loading: false,
};

export const filesReducer = (
  state = initalStateImages,
  action: ActionsGroup
): IGroupsStateTypes => {
  switch (action.type) {
    case InterfaceImageTypes.USER_ALL_FILES:
      return { ...state, loading: false, allGroups: action.payload };

    case InterfaceImageTypes.USER_FILE:
      return { ...state, loading: false, group: action.payload };

    case InterfaceImageTypes.USER_FILES_INFO:
      return { ...state, loading: false, groupsInfo: action.payload };

    case InterfaceImageTypes.USER_FILES:
      return { ...state, loading: false, groups: action.payload };

    default:
      return state;
  }
};
