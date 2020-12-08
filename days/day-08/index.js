import { input } from "./input.js";

function parseInput(str) {
  return str.trim().split("\n");
}

const operations = {
  acc: value => {
    return { next: 1, sum: +value };
  },
  jmp: value => {
    return { next: +value, sum: 0 };
  },
  nop: () => {
    return { next: 1, sum: 0 };
  }
};

function program(instructions) {
  let acc = 0;

  function executeInstruccion(instruction) {
    const [key, value] = instruction.split(" ");
    const operation = operations[key];
    const { next, sum } = operation(+value);

    acc = acc + sum;
    return next;
  }

  function execute() {
    const visited = {};
    const lastOperation = instructions.length - 1;
    let operation = 0;

    while (
      !visited[operation] &&
      !visited[lastOperation] &&
      operation <= lastOperation
    ) {
      visited[operation] = true;
      const next = executeInstruccion(instructions[operation]);
      operation = operation + next;
    }

    const isFinished = !!visited[lastOperation];

    return { acc, isFinished };
  }

  return {
    execute
  };
}

/**
 * @param {Array<string>} instructions
 */
function repair(instructions) {
  instructions = instructions.slice();
  let from = 0;

  /**
   * @param {string} instruction
   */
  function changeInstruction(instruction) {
    return instruction.replace(/jmp|nop/, value => {
      switch (value) {
        case "jmp":
          return "nop";
        case "nop":
          return "jmp";
        default:
          return value;
      }
    });
  }

  function changeNextInstruction() {
    const nextInstructions = instructions.slice(from);
    const instructionChange = nextInstructions.findIndex(op =>
      op.match(/jmp|nop/)
    );

    if (instructionChange <= -1) {
      throw Error("Not found operation to change");
    }

    nextInstructions[instructionChange] = changeInstruction(
      nextInstructions[instructionChange]
    );

    const newInstructions = instructions
      .slice(0, from)
      .concat(nextInstructions);
    from = from + instructionChange + 1;

    return newInstructions;
  }

  function run(exec) {
    const res = exec.execute();

    if (res.isFinished) {
      return res;
    }

    exec = program(changeNextInstruction());

    return run(exec);
  }

  function execute() {
    return run(program(instructions));
  }

  return { execute };
}

export function run() {
  let response;
  let exercise;

  const arrInput = parseInput(input);

  console.log("Day 8, Part One");
  exercise = program(arrInput);
  response = exercise.execute();
  console.log(response.acc);

  console.log("Day 8, Part Two");
  exercise = repair(arrInput);
  response = exercise.execute();
  console.log(response.acc);
}
