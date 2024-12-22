import {
  ActionTypesHelpers,
  ConstantHelpers,
  HelpersInitial,
} from "../Types/Types";

const initialState: HelpersInitial = {
  verifay: false,
};

export const reducerHelpers = (
  state = initialState,
  action: ActionTypesHelpers
): HelpersInitial => {
  switch (action.type) {
    case ConstantHelpers.VERIFAY:
      return { ...state, verifay: action.payload };
    default:
      return state;
  }
};
