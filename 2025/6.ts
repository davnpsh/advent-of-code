// @ts-ignore
import input from "./inputs/6.txt";

const PROBLEM_SHEET: string[][] = input
  .split("\n")
  .map((line: string) =>
    line
      .trim()
      .replace(/\n$/, "")
      .split(" ")
      .filter((elem: string) => elem !== ""),
  )
  .filter((row: string) => row.length !== 0);

let ps: number,
  total_sum: number = 0;

// cols
for (let i: number = 0; i < PROBLEM_SHEET[0].length; i++) {
  if (PROBLEM_SHEET[PROBLEM_SHEET.length - 1][i] === "+") {
    ps = 0;
    // rows
    for (let j: number = 0; j < PROBLEM_SHEET.length - 1; j++) {
      ps += parseInt(PROBLEM_SHEET[j][i]);
    }
  } else {
    ps = 1;
    // rows
    for (let j: number = 0; j < PROBLEM_SHEET.length - 1; j++) {
      ps *= parseInt(PROBLEM_SHEET[j][i]);
    }
  }

  total_sum += ps;
}

console.log("Grand total:", total_sum);
