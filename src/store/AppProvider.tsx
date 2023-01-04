import { useDisclosure } from "@chakra-ui/react";
import React, { createContext, Dispatch, useReducer } from "react";
import { AppActions, appReducer, AppStateType } from "./reducer";
import { initialState } from "./reducer";

export const AppContext = createContext<{
  state: AppStateType;
  dispatch: Dispatch<AppActions>;
  disclosure: ReturnType<typeof useDisclosure> | undefined;
}>({
  state: initialState,
  dispatch: () => null,
  disclosure: undefined,
});

export const AppProvider = ({ children }: { children?: React.ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const disclosure = useDisclosure();

  return (
    <AppContext.Provider value={{ state, dispatch, disclosure }}>
      {children}
    </AppContext.Provider>
  );
};
