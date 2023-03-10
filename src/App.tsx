import { NavBar } from "./components/NavBar";
import { useAppContext } from "./store/useAppContext";
import { GameRow } from "./components/GameRow";
import { Keyboard } from "./components/Keyboard";
import { NUMBER_OF_TRIES } from "./constants";
import { useEffect } from "react";
import { Box, useToast } from "@chakra-ui/react";
import { StatsModal } from "./components/StatsModal";

function App() {
  const { state, disclosure } = useAppContext();

  const toast = useToast();

  useEffect(() => {
    if (state.gameState === "won") {
      toast({
        title: "You Won!",
        duration: null,
        isClosable: true,
        position: "top",
      });
      disclosure?.onOpen();
    } else if (state.gameState === "lose") {
      toast({
        title: "Lose",
        description: `Word is "${state.answer.toUpperCase()}"`,
        duration: null,
        isClosable: true,
        position: "top",
      });
    }
  }, [state.gameState]);

  return (
    <>
      <StatsModal />
      <NavBar />
      {Array.from({ length: NUMBER_OF_TRIES }).map((_, index) => (
        <GameRow rowNumber={+index + 1} key={`number-of-tries-${index}`} />
      ))}
      <Box paddingTop={10}>
        <Keyboard />
      </Box>
    </>
  );
}

export default App;
