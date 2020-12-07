import { input } from "./input.js";

function parseInput(str) {
  return str.trim().split("\n");
}

function part1() {
  function isMatchRule(rule, bagColor) {
    const regex = new RegExp(`\\d.${bagColor}.bag`);
    const match = rule.match(regex);

    return !!match;
  }

  function findBagColor(rules, bagColor) {
    return rules.reduce((acc, rule) => {
      if (isMatchRule(rule, bagColor)) {
        const colorRule = rule
          .split(" ")
          .slice(0, 2)
          .join(" ");
        acc.push(colorRule);
      }

      return acc;
    }, []);
  }

  function countBagColor(rules, bagColor) {
    const matchRules = new Set(findBagColor(rules, bagColor));
    const addColors = colors => colors.forEach(color => matchRules.add(color));
    for (let rule of matchRules) {
      addColors(findBagColor(rules, rule));
    }

    return matchRules.size;
  }

  return { count: countBagColor };
}

function part2(rules) {
  function findBagColor(bagColor) {
    const regex = new RegExp(`^${bagColor}`);
    const rule = rules.find(rule => rule.match(regex));

    if (!rule) {
      return undefined;
    }

    return rule;
  }

  function parseRule(rule) {
    const [, options] = rule.split(" bags contain ");

    if (options.includes("no other bags")) {
      return null;
    }

    const children = options
      .split(/bags?[,|.]?/)
      .filter(Boolean)
      .map(option => {
        const [qty, ...name] = option.trim().split(" ");
        return { qty, color: name.join(" ") };
      });

    return children;
  }

  function createTree(bagColor) {
    const rule = findBagColor(bagColor);
    const children = parseRule(rule);

    if (children === null) {
      return children;
    }

    return children.map(({ qty, color }) => {
      return {
        qty,
        color,
        children: createTree(color)
      };
    });
  }

  function countChildren(value, total = 1) {
    total = value.qty * total;

    if (!value.children) {
      return total;
    }

    return value.children.reduce((acc, child) => {
      return acc + countChildren(child, total);
    }, total);
  }

  function countBag(bagColor) {
    const contains = createTree(bagColor);

    return contains.reduce((acc, item) => countChildren(item) + acc, 0);
  }

  return { count: countBag };
}

export function run() {
  let response;
  let exercise;

  const rules = parseInput(input);

  console.log("Day 7, Part One");
  exercise = part1();
  response = exercise.count(rules, "shiny gold");
  console.log(response);

  console.log("Day 7, Part Two");
  exercise = part2(rules);
  response = exercise.count("shiny gold");
  console.log(response);
}
