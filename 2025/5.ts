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
const CLEANED_RANGES: range[] = [];

// Given the limit of a range, find if a range contains it
// if so, return the index
function find_range_index(lim: number): number | null {
  for (let i = 0; i < RANGES.length; i++) {
    if (lim >= RANGES[i].min && lim <= RANGES[i].max) {
      return i;
    }
  }

  return null;
}

while (RANGES.length > 0) {
  let range: range = RANGES.shift()!;

  // range index in which the "min" value from the current range was found
  let min_range_index = find_range_index(range.min);

  let new_min: number | null = null;

  if (min_range_index !== null) {
    new_min = RANGES[min_range_index].min;
    RANGES.splice(min_range_index, 1);
  } else {
    new_min = range.min;
  }

  // range index in which the "max" value from the current range was found
  let max_range_index = find_range_index(range.max);

  let new_max: number | null = null;

  if (max_range_index !== null) {
    new_max = RANGES[max_range_index].max;
    RANGES.splice(max_range_index, 1);
  } else {
    new_max = range.max;
  }

  let new_range = { min: new_min, max: new_max };

  CLEANED_RANGES.push(new_range);
}

// Count
for (const { min, max } of CLEANED_RANGES) {
  fresh_second_half += max - min + 1;
}

console.log("Fresh ingredients in first half:", fresh_first_half);
console.log("Fresh ingredients in second half:", fresh_second_half);
