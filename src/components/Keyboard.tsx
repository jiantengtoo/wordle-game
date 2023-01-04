import { Button, Flex, Box, Center, useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { KEYBOARD_LAYOUT, NUMBER_OF_LETTERS } from "../constants";
import { useAppContext } from "../store/useAppContext";

export const Keyboard = (): JSX.Element => {
  const { state, dispatch } = useAppContext();

  const toast = useToast();

  const onClick = (char: string) => {
    if (state.gameState !== "guessing") return;
    if (char === "enter") {
      if (
        state.attemptAnswer[state.attemptNumber].guess.length !==
        NUMBER_OF_LETTERS
      ) {
        toast({
          title: "Not enough letter",
          duration: 1500,
          position: "top",
        });
      } else {
        dispatch({ type: "ENTER" });
      }
    } else if (char === "delete") {
      dispatch({ type: "DELETE" });
    } else {
      dispatch({ type: "CLICK_LETTER", payload: char });
    }
  };

  return (
    <>
      {KEYBOARD_LAYOUT.map((row, index) => (
        <Center paddingTop={3} key={`keyboard-row-${index}`}>
          <Flex gap={2}>
            {row.map((char) => (
              <Button
                onClick={() => onClick(char)}
                key={`keyboard-key-${char}`}
              >
                {char.toUpperCase()}
              </Button>
            ))}
          </Flex>
        </Center>
      ))}
    </>
  );
};
