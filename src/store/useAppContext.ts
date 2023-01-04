import { useContext } from "react";
import { AppContext } from "./AppProvider";

export const useAppContext = () => {
  const { state, dispatch, disclosure } = useContext(AppContext);

  return {
    state,
    dispatch,
    disclosure,
  };
};
