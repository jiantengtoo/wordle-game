import { LetterBox } from "./LetterBox";
import { EmptyBox } from "./EmptyBox";
import { Flex } from "@chakra-ui/react";
import { useAppContext } from "../store/useAppContext";
import { NUMBER_OF_LETTERS } from "../constants";

type GameRowProps = {
  rowNumber: number;
};

export const GameRow = ({ rowNumber }: GameRowProps) => {
  const { state } = useAppContext();

  return (
    <>
      <Flex justifyContent={"center"} paddingTop={3}>
        <Flex gap={"2"}>
          {[...state.attemptAnswer[rowNumber].guess].map((ans, index) => {
            if (state.attemptAnswer[rowNumber].check.length) {
              return (
                <LetterBox
                  letter={ans}
                  variant={
                    state.attemptAnswer[rowNumber].check[index] as
                      | "correct"
                      | "wrong"
                      | "not"
                  }
                  key={`letter-box-${rowNumber},${index}`}
                />
              );
            } else {
              return (
                <LetterBox
                  letter={ans}
                  variant={"beforeEnter"}
                  key={`letter-box-${rowNumber},${index}`}
                />
              );
            }
          })}
          {Array.from({
            length:
              NUMBER_OF_LETTERS - state.attemptAnswer[rowNumber].guess.length,
          }).map((_, index) => (
            <EmptyBox key={`empty-box-${rowNumber},${index}`} />
          ))}
        </Flex>
      </Flex>
    </>
  );
};
