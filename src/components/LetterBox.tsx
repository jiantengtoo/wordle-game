import { Square, Text } from "@chakra-ui/react";

const BG_MAP = {
  correct: "#6aaa64",
  wrong: "#c9b458",
  not: "#787c7e",
  beforeEnter: "#ffffff",
} as const;

const COLOR_MAP = {
  correct: "#ffffff",
  wrong: "#ffffff",
  not: "#ffffff",
  beforeEnter: "#000000",
} as const;

type LetterBoxProps = {
  letter: string;
  variant: "correct" | "wrong" | "not" | "beforeEnter";
};

export const LetterBox = ({ letter, variant }: LetterBoxProps): JSX.Element => {
  return (
    <Square
      size={"62px"}
      bg={BG_MAP[variant]}
      color={COLOR_MAP[variant]}
      border={variant === "beforeEnter" ? "2px solid #878a8c" : undefined}
    >
      <Text fontSize={"2xl"}>{letter.toUpperCase()}</Text>
    </Square>
  );
};
