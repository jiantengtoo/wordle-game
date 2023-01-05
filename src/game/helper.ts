import { wordlist } from "../assets/wordlist";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export const generateWord = () => {
  const randomInt = getRandomInt(wordlist.split(/\n/).length);
  return wordlist.split(/\n/)[randomInt];
};

export const checkWord = (
  guess: string,
  answer: string
): {
  result: string[];
  correctKeys: string[];
  wrongKeys: string[];
  notKeys: string[];
} => {
  if (guess.length !== answer.length || guess.length === 0) throw Error;

  let answerClone = answer;

  const result: string[] = [];

  const correctKeys: string[] = [];
  const wrongKeys: string[] = [];
  const notKeys: string[] = [];

  [...guess].forEach((char, index) => {
    if (char === answerClone[index]) {
      result.push("correct");
      correctKeys.push(char);
      answerClone = answerClone.replace(char, " ");
    } else if (answerClone.includes(char)) {
      result.push("wrong");
      wrongKeys.push(char);
      answerClone = answerClone.replace(char, " ");
    } else {
      result.push("not");
      notKeys.push(char);
    }
  });

  return { result, correctKeys, wrongKeys, notKeys };
};
