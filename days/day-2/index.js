import { input } from "./input";

function part1() {
  function findValidPassword(arr) {
    return arr.filter(isValidPassword);
  }

  function isValidPassword(el) {
    const [min, max, letter, text] = el
      .replace("-", " ")
      .replace(":", "")
      .split(" ");
    const regex = new RegExp(letter, "g");
    const matches = (text.match(regex) || []).length;

    return matches >= min && matches <= max;
  }

  return {
    findValidPassword,
    isValidPassword
  };
}

function part2() {
  function findValidPassword(arr) {
    return arr.filter(isValidPassword);
  }

  function isValidPassword(el) {
    let [positions, letter, text] = el.replace(":", "").split(" ");
    const matches = positions
      .split("-")
      .filter(position => text[position - 1] === letter);

    return matches.length === 1;
  }

  return {
    findValidPassword,
    isValidPassword
  };
}

export function run() {
  let response;
  let exercise;

  console.log("Day 2, Part One");
  exercise = part1();
  response = exercise.findValidPassword(input);
  console.log(response.length);

  console.log("Day 2, Part Two");
  exercise = part2();
  response = exercise.findValidPassword(input);
  console.log(response.length);
}
