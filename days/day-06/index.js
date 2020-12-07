import { input } from "./input";

function parseInput(str) {
  return str.trim().split("\n\n");
}

function part1() {
  function parseGroupAnswer(answers) {
    return answers
      .trim()
      .replace(/\n/g, "")
      .split("");
  }

  function countGroup(answers) {
    answers = parseGroupAnswer(answers);
    const countSet = new Set(answers);

    return countSet.size;
  }

  return { count: countGroup };
}

function part2() {
  const aCode = "a".charCodeAt();
  const aZ = Array.from({ length: 26 }).map((_, i) =>
    String.fromCharCode(aCode + i)
  );

  function countPeople(answers) {
    return answers.trim().split("\n").length;
  }

  function parseGroupAnswer(answers) {
    return answers.trim().replace(/\n/g, "");
  }

  function countGroup(answers) {
    const size = countPeople(answers);
    answers = parseGroupAnswer(answers);

    const count = aZ.filter(char => {
      const regex = new RegExp(char, "g");
      const matches = (answers.match(regex) || []).length;
      return matches === size;
    }).length;

    return count;
  }

  return {
    count: countGroup
  };
}

export function run() {
  let response;
  let exercise;

  const arr = parseInput(input);

  function loop() {
    return arr.reduce((acc, group) => {
      return acc + exercise.count(group);
    }, 0);
  }

  console.log("Day 6, Part One");
  exercise = part1();
  response = loop();
  console.log(response);

  console.log("Day 6, Part Two");
  exercise = part2();
  response = loop();
  console.log(response);
}
