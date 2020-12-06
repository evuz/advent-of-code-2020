import { input } from "./input";

const RowLetters = ["F", "L"];
const RowOrder = {
  Lower: "F",
  Upper: "B"
};

const ColumnLetters = ["L", "R"];
const ColumnOrder = {
  Lower: "L",
  Upper: "R"
};

function diff(min, max) {
  return Math.ceil((max - min) / 2);
}

function parseInput(str) {
  return str.trim().split("\n");
}

function calculatePosition(characters, comparator) {
  let min = 0;
  let max = 2 ** characters.length - 1;

  for (let character of characters) {
    const next = diff(min, max);

    switch (character) {
      case comparator.Upper:
        min = min + next;
        break;
      case comparator.Lower:
        max = max - next;
        break;
      default:
        throw Error(`Invalid character: ${character} (${characters})`);
    }
  }

  return min;
}

function binaryBoarding(characters) {
  const [row, column] = characters.replace(/L|R/, v => `,${v}`).split(",");
  const numberRow = calculatePosition(row, RowOrder);
  const numberColumn = calculatePosition(column, ColumnOrder);

  return numberRow * 8 + numberColumn;
}

function getBoardingList(arr) {
  return arr.map(item => {
    return binaryBoarding(item);
  });
}

function findMissing(numbers) {
  const numberObject = numbers.reduce((acc, number) => {
    acc[number] = true;
    return acc;
  }, {});

  let count = Math.min(...numbers);
  while (numberObject[count]) {
    count++;
  }
  return count;
}

export function run() {
  let response;

  const inputArr = parseInput(input);
  const boardingList = getBoardingList(inputArr);

  console.log("Day 5, Part One");

  response = Math.max(...boardingList);
  console.log(response);

  console.log("Day 5, Part Two");
  response = findMissing(boardingList);
  console.log(response);
}
