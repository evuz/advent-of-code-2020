import fs from "fs";
import path from "path";
import utils from "util";
import inquirer from "inquirer";

function readDays() {
  const readDir = utils.promisify(fs.readdir);
  return readDir(path.join(path.resolve(), "days"));
}

function createEntryPoint(day) {
  const template = `
  import { run } from '../days/${day}/index.js';
  run();
  `;

  const writeFile = utils.promisify(fs.writeFile);
  return writeFile(path.join(path.resolve(), "scripts", ".start.js"), template);
}

async function main() {
  try {
    const days = await readDays();
    const { day } = await inquirer.prompt({
      type: "list",
      message: "Choose day to execute",
      name: "day",
      choices: days,
    });
    await createEntryPoint(day);
  } catch (error) {
    process.exit(1);
  }
}

main();
