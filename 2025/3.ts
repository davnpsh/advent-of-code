// @ts-ignore
import input from "./inputs/3.txt";

const BATTERY_BANKS: string[] = input
  .split("\n")
  .map((line: string) => line.trim().replace(/\n$/, ""))
  .filter((line: string) => line.trim() !== "");
let total_max_joltage_first_half: number = 0;
let total_max_joltage_second_half: number = 0;

function k_max(k: number, arr: number[]) {
  let stack: number[] = [];
  let left_to_remove: number = arr.length - k;

  for (let i: number = 0; i < arr.length; i++) {
    while (
      stack.length > 0 &&
      left_to_remove > 0 &&
      arr[i] > stack[stack.length - 1]
    ) {
      stack.pop();
      left_to_remove--;
    }

    stack.push(arr[i]);
  }

  return stack.slice(0, k);
}

// Turns on a battery bank by finding the largest possible joltage
// it can produce based on how many batteries (k) need to be turned on
function turn_on(k: number, battery_bank: string): number {
  const arr: number[] = battery_bank
    .split("")
    .map((num: string) => parseInt(num));

  const batteries = k_max(k, arr);

  return parseInt(batteries.join(""));
}

for (const [index, battery_bank] of BATTERY_BANKS.entries()) {
  total_max_joltage_first_half += turn_on(2, battery_bank);
  total_max_joltage_second_half += turn_on(12, battery_bank);
}

console.log("Total output joltage first half:", total_max_joltage_first_half);
console.log("Total output joltage second half:", total_max_joltage_second_half);
