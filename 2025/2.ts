// @ts-ignore
import input from "./inputs/2.txt";

const RANGES: string[] = input
  .split(",")
  .map((line: string) => line.trim().replace(/\n$/, ""))
  .filter((line: string) => line.trim() !== "");
let sum_first_half: number = 0;
let sum_second_half: number = 0;

function process_number_second_half(number: string) {
  for (let i: number = 1; i <= number.length / 2; i++) {
    let flag: boolean = true;
    let sub: string = number.substring(0, i);

    for (let j: number = sub.length; j < number.length; j += sub.length) {
      let sub2: string = number.substring(j, j + sub.length);
      if (sub !== sub2) flag = false;
    }

    if (flag) {
      sum_second_half += parseInt(number);
      return;
    }
  }
}

function process_number_first_half(number: string) {
  if (number.length % 2 != 0) return;

  let half: string = number.substring(0, number.length / 2);

  if (half == number.substring(number.length / 2, number.length))
    sum_first_half += parseInt(number);
}

function process_range(range: string) {
  const [first, last]: number[] = range
    .split("-")
    .map((ind: string) => parseInt(ind));

  for (let i: number = first; i <= last; i++) {
    process_number_first_half(i.toString());
    process_number_second_half(i.toString());
  }
}

for (const range of RANGES) {
  process_range(range);
}

console.log("Adding up all invalid IDs for first half:", sum_first_half);
console.log("Adding up all invalid IDs for second half:", sum_second_half);