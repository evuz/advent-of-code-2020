import { input } from "./input.js";

const LENGTH_PREAMBLE = 25;

/**
 * @param {string} str 
 */
function parseInput(str) {
  return str.trim().split("\n");
}

function generatePreamble(data) {
  const preamble = {};
  for (let i = 0; i < data.length; i++) {
    const n1 = +data[i];
    for (let j = i ; j < data.length; j++) {
      const n2 = +data[j]
      preamble[n1 + n2] = true;
    }
  }

  return preamble;
}

function breakEncoding(data, number) {
  let i = 0;
  let sum = 0;
  let group = [];
  console.log(number)
  while(sum !== number) {
    let j = i + 1;
    sum = 0;
    group = [+data[i]];
    while (sum < number) {
      group.push(+data[j])
      sum = group.reduce((acc, n) => acc + n, 0)
      j++
    }

    i++;
  }

  const max = Math.max(...group);
  const min = Math.min(...group);

  return max + min;
}

/**
 * @param {Array} data
 */
function checkEncoding(data) {
  let index = 0;
  let value = 0;
  let preamble = {};

  do {
    const group = data.slice(index, index + LENGTH_PREAMBLE);
    preamble = generatePreamble(group);
    value = +data[index + LENGTH_PREAMBLE];
    index++;
  } while (preamble[value]);
  return value;
}

export function run() {
  let response;

  const arrInput = parseInput(input);

  console.log("Day 9, Part One");
  response = checkEncoding(arrInput);
  console.log(response);

  console.log("Day 9, Part Two");
  response = breakEncoding(arrInput, response);
  console.log(response);
}
