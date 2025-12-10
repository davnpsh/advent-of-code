// @ts-ignore
import input from "./inputs/1.txt";

const MOVEMENTS: string[] = input
  .split("\n")
  .filter((line: string) => line.trim() !== "");
const START: number = 50;

function right(times: number) {
  pointing = (pointing + times) % 100;
}

function left(times: number) {
  pointing = (pointing - (times % 100) + 100) % 100;
}

function rotate(rotation: string) {
  const DIRECTION: string = rotation.charAt(0);
  const TIMES: number = parseInt(rotation.substring(1));

  if (DIRECTION === "R") right(TIMES);
  else left(TIMES);
}

let pointing: number = START;
let zero: number = 0;

for (let movement of MOVEMENTS) {
  rotate(movement);
  console.log(pointing);

  if (pointing === 0) zero++;
}

console.log("Times left pointed at zero:", zero);
