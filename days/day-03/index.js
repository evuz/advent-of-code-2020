import { input } from "./input.js";

const ElementsPath = {
  tree: "#",
  open: "."
};

function stringToPath(str) {
  const lines = str.trim().split("\n");
  return lines.map(line => line.split(""));
}

function checkPath(arr, deltaX, deltaY) {
  let total = 0;

  for (let i = 0; i * deltaY < arr.length; i++) {
    const posX = i * deltaX;
    const posY = i * deltaY;
    const line = arr[posY];
    const position = line[posX % line.length];

    if (position === ElementsPath.tree) {
      total = total + 1;
    }
  }
  return total;
}

export function run() {
  let response;

  const arr = stringToPath(input);

  console.log("Day 3, Part One");
  response = checkPath(arr, 3, 1);
  console.log(response);

  console.log("Day 3, Part Two");
  const iterations = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 }
  ];
  response = iterations.reduce((acc, iteration) => {
    return acc * checkPath(arr, iteration.x, iteration.y);
  }, 1);
  console.log(response);
}
