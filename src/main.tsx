import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./store/AppProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider>
    <AppProvider>
      <App />
    </AppProvider>
  </ChakraProvider>
);
