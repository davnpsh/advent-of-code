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
  .filter((row: Array<string>) => row.length !== 0);

let ps: number,
  total_sum_first_half: number = 0;

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

  total_sum_first_half += ps;
}

const SCRATCH_PROBLEM_SHEET: string[][] = input
  .split("\n")
  .map((line: string) => line.replace(/\n$/, "").split(""))
  .filter((row: Array<string>) => row.length !== 0);

let total_sum_second_half: number = 0;

let start: number;
let op: string;
const last_row: string[] =
  SCRATCH_PROBLEM_SHEET[SCRATCH_PROBLEM_SHEET.length - 1];

for (let i: number = 0; i < last_row.length; i++) {
  if (last_row[i] === "+" || last_row[i] === "*") {
    start = i;
    op = last_row[i];
  }
  if (
    last_row[i + 1] === "+" ||
    last_row[i + 1] === "*" ||
    i + 1 === last_row.length
  ) {
    let problem: string[][] = [];

    // define problem
    for (let j: number = 0; j < SCRATCH_PROBLEM_SHEET.length; j++) {
      let line: string[] = [];

      for (let k: number = start!; k <= i; k++) {
        line.push(SCRATCH_PROBLEM_SHEET[j][k]);
      }

      problem.push(line);
    }

    // solve problem
    let ps: number = op! === "+" ? 0 : 1;

    // cols
    for (let m: number = 0; m < problem[0].length; m++) {
      let num: string = "";
      // rows
      for (let n: number = 0; n < problem.length - 1; n++) {
        num += problem[n][m];
      }

      if (num.trim() !== "")
        if (op! === "+") ps += parseInt(num.trim());
        else ps *= parseInt(num.trim());
    }

    total_sum_second_half += ps;
  }
}

console.log("Grand total - first half:", total_sum_first_half);
console.log("Grand total - second half:", total_sum_second_half);
