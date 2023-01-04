import { wordlist } from "../assets/wordlist";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export const generateWord = () => {
  const randomInt = getRandomInt(wordlist.split(/\n/).length);
  return wordlist.split(/\n/)[randomInt];
};

export const checkWord = (guess: string, answer: string): string[] => {
  if (guess.length !== answer.length || guess.length === 0) throw Error;

  let answerClone = answer;

  const result: string[] = [];

  [...guess].forEach((char, index) => {
    if (char === answerClone[index]) {
      result.push("correct");
      answerClone = answerClone.replace(char, " ");
    } else if (answerClone.includes(char)) {
      result.push("wrong");
      answerClone = answerClone.replace(char, " ");
    } else {
      result.push("not");
    }
  });

  return result;
};
