import { NUMBER_OF_LETTERS, NUMBER_OF_TRIES } from "../constants";
import { checkWord, generateWord } from "../game/helper";
import { updateStatsLoseGame, updateStatsWonGame } from "./Stats";

export type AppStateType = {
  answer: string;
  attemptAnswer: Record<
    string,
    {
      guess: string;
      check: string[];
    }
  >;
  attemptNumber: number;
  gameState: "guessing" | "won" | "lose";
  keys: {
    correct: string[];
    wrong: string[];
    not: string[];
  };
};

type AttemptAnswerType = AppStateType["attemptAnswer"];

export const initialState: AppStateType = {
  answer: generateWord(),
  attemptAnswer: Array.from({ length: NUMBER_OF_TRIES }).reduce(
    (prev: AttemptAnswerType, _, index) => {
      return {
        ...prev,
        [index + 1]: {
          guess: "",
          check: [],
        },
      };
    },
    {} as AttemptAnswerType
  ),
  attemptNumber: 1,
  gameState: "guessing",
  keys: {
    correct: [] as string[],
    wrong: [] as string[],
    not: [] as string[],
  },
} as const;

export type AppActions =
  | { type: "RESET" }
  | { type: "CLICK_LETTER"; payload: string }
  | { type: "ENTER" }
  | { type: "DELETE" }
  | { type: "NEXT_GAME" };

export const appReducer = (
  state: AppStateType,
  action: AppActions
): AppStateType => {
  switch (action.type) {
    case "NEXT_GAME":
      return { ...initialState, answer: generateWord() };
    case "RESET":
      return { ...initialState, answer: state.answer };
    case "CLICK_LETTER": {
      if (
        state.attemptAnswer[state.attemptNumber].guess.length >=
        NUMBER_OF_LETTERS
      )
        return state;

      return {
        ...state,
        attemptAnswer: {
          ...state.attemptAnswer,
          [state.attemptNumber]: {
            ...state.attemptAnswer[state.attemptNumber],
            guess:
              state.attemptAnswer[state.attemptNumber].guess + action.payload,
          },
        },
      };
    }
    case "DELETE": {
      if (state.attemptAnswer[state.attemptNumber].guess.length === 0)
        return state;

      return {
        ...state,
        attemptAnswer: {
          ...state.attemptAnswer,
          [state.attemptNumber]: {
            ...state.attemptAnswer[state.attemptNumber],
            guess: state.attemptAnswer[state.attemptNumber].guess.slice(
              0,
              state.attemptAnswer[state.attemptNumber].guess.length - 1
            ),
          },
        },
      };
    }
    case "ENTER": {
      if (
        state.attemptAnswer[state.attemptNumber].guess.length !==
        NUMBER_OF_LETTERS
      )
        return state;

      const {
        result: checkWordArr,
        correctKeys,
        wrongKeys,
        notKeys,
      } = checkWord(
        state.attemptAnswer[state.attemptNumber].guess,
        state.answer
      );

      if (checkWordArr.every((s) => s === "correct")) {
        updateStatsWonGame(state.attemptNumber);

        return {
          ...state,
          attemptAnswer: {
            ...state.attemptAnswer,
            [state.attemptNumber]: {
              ...state.attemptAnswer[state.attemptNumber],
              check: checkWordArr,
            },
          },
          gameState: "won",
          keys: {
            ...state.keys,
            correct: [...state.keys.correct, ...correctKeys],
          },
        };
      }

      if (
        !checkWordArr.every((s) => s === "correct") &&
        state.attemptNumber === NUMBER_OF_TRIES
      ) {
        updateStatsLoseGame();
        return {
          ...state,
          attemptAnswer: {
            ...state.attemptAnswer,
            [state.attemptNumber]: {
              ...state.attemptAnswer[state.attemptNumber],
              check: checkWordArr,
            },
          },
          gameState: "lose",
          keys: {
            correct: [...state.keys.correct, ...correctKeys],
            wrong: [...state.keys.wrong, ...wrongKeys],
            not: [...state.keys.not, ...notKeys],
          },
        };
      }

      return {
        ...state,
        attemptNumber: state.attemptNumber + 1,
        attemptAnswer: {
          ...state.attemptAnswer,
          [state.attemptNumber]: {
            ...state.attemptAnswer[state.attemptNumber],
            check: checkWordArr,
          },
        },
        keys: {
          correct: [...state.keys.correct, ...correctKeys],
          wrong: [...state.keys.wrong, ...wrongKeys],
          not: [...state.keys.not, ...notKeys],
        },
      };
    }
    default:
      return state;
  }
};
