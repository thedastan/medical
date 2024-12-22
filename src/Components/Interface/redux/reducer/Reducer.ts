/* Local dependencies */
import {
  ActionTypesUser,
  IInterfaceUserState,
  InterfaceUserTypes,
} from "../types/Types";

const initalStateUser: IInterfaceUserState = {
  error: "",
  loading: false,
  user: {},
  bearbeitenNotfall: true,
  bearbeitenAkte: true,
};

export const userReducer = (
  state = initalStateUser,
  action: ActionTypesUser
): IInterfaceUserState => {
  switch (action.type) {
    case InterfaceUserTypes.USER_LOADER:
      return { ...state, loading: true };

    case InterfaceUserTypes.USERS:
      return { ...state, loading: false, error: "", user: action.payload };

    case InterfaceUserTypes.USER_ERROR:
      return { ...state, loading: false, error: action.payload };

    case InterfaceUserTypes.BEARBEITEN_NOTFALL:
      return {
        ...state,
        loading: false,
        bearbeitenNotfall: action.payload,
      };

    case InterfaceUserTypes.BEARBEITEN_AKTE:
      return {
        ...state,
        loading: false,
        bearbeitenAkte: action.payload,
      };

    default:
      return state;
  }
};
