import { Flex, Center, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import {
  ALPHABETS_KEY_RANGE,
  KEYBOARD_LAYOUT,
  NUMBER_OF_LETTERS,
} from "../constants";
import { useAppContext } from "../store/useAppContext";

const BG_MAP = {
  correct: "#6aaa64",
  wrong: "#c9b458",
  not: "#787c7e",
  beforeEnter: "#d3d6da",
} as const;

const COLOR_MAP = {
  correct: "#ffffff",
  wrong: "#ffffff",
  not: "#ffffff",
  beforeEnter: "#000000",
} as const;

const Key = ({
  char,
  onClick,
  variant,
}: {
  char: string;
  onClick: (char: string) => void;
  variant: "correct" | "wrong" | "not" | "beforeEnter";
}) => {
  return (
    <Center
      minW={"10"}
      minH={"14"}
      p={"2"}
      bg={BG_MAP[variant]}
      color={COLOR_MAP[variant]}
      borderRadius={"8"}
      onClick={() => onClick(char)}
      key={`keyboard-key-${char}`}
    >
      {char.toUpperCase()}
    </Center>
  );
};

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

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === "Enter") {
        onClick("enter");
      } else if (e.code === "Backspace") {
        onClick("delete");
      } else if (ALPHABETS_KEY_RANGE.includes(e.key)) {
        onClick(e.key);
      }
    };

    window.addEventListener("keyup", listener);

    return () => {
      window.removeEventListener("keyup", listener);
    };
  }, [state.attemptAnswer[state.attemptNumber].guess.length]);

  return (
    <>
      {KEYBOARD_LAYOUT.map((row, index) => (
        <Center paddingTop={3} key={`keyboard-row-${index}`}>
          <Flex gap={2}>
            {row.map((char) => {
              const variant = state.keys.correct.includes(char)
                ? "correct"
                : state.keys.wrong.includes(char)
                ? "wrong"
                : state.keys.not.includes(char)
                ? "not"
                : "beforeEnter";

              return <Key char={char} onClick={onClick} variant={variant} />;
            })}
          </Flex>
        </Center>
      ))}
    </>
  );
};
