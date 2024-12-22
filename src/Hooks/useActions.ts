/* External dependencies */
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

/* Local dependencies */
import ActionsAuth from "../Components/Registration/redux/action/Index";
import ActionsUser from "../Components/Interface/redux/action/Index";
import ActionsFile from "../Components/Interface/redux-image/action/Index";
import ActionsModal from "../Components/Interface/popup/redux-for-modal/action/Index";
import ActionsMessage from "../Components/Ui/popups/redux/action/Index";
import ActionGuest from "../Components/GuestMode/redux/action/Index";
import ActionsError from "../Containers/errors/redux/action/Index";
import ActionHelpers from "../Components/Helpers/Redux/Action/Index";

export const useActionsUser = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionsUser, dispatch);
};

export const useActionsAuth = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionsAuth, dispatch);
};

export const useActionsFile = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionsFile, dispatch);
};

export const useActionsForModal = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionsModal, dispatch);
};

export const useActionsForMessage = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionsMessage, dispatch);
};

export const useActionsGuest = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionGuest, dispatch);
};

export const useActionsErrors = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionsError, dispatch);
};

export const useActionsHelpers = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionHelpers, dispatch);
};
