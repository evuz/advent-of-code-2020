import { input } from "./input.js";

const REQUIRED_FIELDS = [
  { key: "byr", valid: /^19([2-9][0-9])?$|^200([0-2])?$/ },
  { key: "iyr", valid: /^201([0-9])?$|^2020?$/ },
  { key: "eyr", valid: /^202([0-9])?$|^2030?$/ },
  { key: "hgt", valid: /^(59|6[0-9]|7[0-6])in$|^(1([5-8][0-9]|9[0-3]))cm$/ },
  { key: "hcl", valid: /^#[0-9a-f]{6}$/ },
  { key: "ecl", valid: /^amb$|^blu$|^brn$|^gry$|^grn$|^hzl$|^oth$/ },
  { key: "pid", valid: /^\d{9}$/ }
];

function parsePassports(str) {
  return str.split("\n\n").map(line => {
    return line
      .trim()
      .replace(/\n/g, " ")
      .split(" ")
      .reduce((acc, data) => {
        const [key, value] = data.split(":");
        acc[key] = value;
        return acc;
      }, {});
  });
}

function checkPassport(passport, validate = false) {
  const fields = REQUIRED_FIELDS.filter(requiredField => {
    const key = requiredField.key;
    if (!passport[key]) {
      return false;
    }

    if (!validate) return true;
    const v = passport[key].match(requiredField.valid);
    return v;
  });
  return fields.length === REQUIRED_FIELDS.length;
}

function checkPassports(str, validate = false) {
  const passports = parsePassports(str);
  return passports.filter(passport => checkPassport(passport, validate));
}

export function run() {
  let response;

  console.log("Day 4, Part One");
  response = checkPassports(input);
  console.log(response.length);

  console.log("Day 4, Part Two");
  response = checkPassports(input, true);
  console.log(response.length);
}
