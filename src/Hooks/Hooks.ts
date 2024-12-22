/* External dependencies */
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

/* Local dependencies */
import { AppDispatch, RootState } from "../Redux/Store/Store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
