// @ts-ignore
import input from "./inputs/1.txt";

const MOVEMENTS: string[] = input
  .split("\n")
  .filter((line: string) => line.trim() !== "");
const START: number = 50;
let pointing: number = START;
let zeros_first_half: number = 0;
let zeros_second_half: number = 0;

function right(times: number) {
  zeros_second_half += Math.floor((pointing + times) / 100);
  
  pointing = (pointing + times) % 100;
}

function left(times: number) {
  let tens: number = times % 100;
  
  if (tens >= pointing && pointing != 0) zeros_second_half++;
  
  zeros_second_half += (times - tens) / 100;
  
  pointing = (pointing - (times % 100) + 100) % 100;
}

function rotate(rotation: string) {
  const DIRECTION: string = rotation.charAt(0);
  const TIMES: number = parseInt(rotation.substring(1));

  if (DIRECTION === "R") right(TIMES);
  else left(TIMES);
  
  if (pointing === 0) zeros_first_half++;
}

for (let movement of MOVEMENTS) {
  rotate(movement);
}

console.log("Times left pointed at zero:", zeros_first_half);
console.log("Times left clicked at zero:", zeros_second_half);