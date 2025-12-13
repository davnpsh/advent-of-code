// @ts-ignore
import input from "./inputs/5.txt";

type range = {
  min: number;
  max: number;
};

const raw = input
  .split("\n")
  .map((line: string) => line.trim().replace(/\n$/, ""))
  .filter((line: string) => line.trim() !== "");

const RANGES: range[] = raw
  .filter((line: string) => line.includes("-"))
  .map((line: string) => {
    let vec = line.split("-");
    return { min: parseInt(vec[0]), max: parseInt(vec[1]) };
  });

const IDs: number[] = raw
  .filter((line: string) => !line.includes("-"))
  .map((line: string) => parseInt(line));

let fresh_first_half = 0;
let fresh_second_half = 0;

for (const id of IDs) {
  for (const { min, max } of RANGES) {
    if (id >= min && id <= max) {
      fresh_first_half++;
      break;
    }
  }
}

// cleaning ranges
const CLEANED_RANGES: range[] = [...RANGES].sort((a, b) => a.min - b.min);

let i: number = 0;

while (i < CLEANED_RANGES.length - 1) {
  let current = CLEANED_RANGES[i];
  let next = CLEANED_RANGES[i + 1];

  if (current.max >= next.min) {
    if (next.max > current.max) current.max = next.max;
    CLEANED_RANGES.splice(i + 1, 1);
  } else i++;
}

// Count
for (const { min, max } of CLEANED_RANGES) {
  fresh_second_half += max - min + 1;
}

console.log("Fresh ingredients in first half:", fresh_first_half);
console.log("Fresh ingredients in second half:", fresh_second_half);
