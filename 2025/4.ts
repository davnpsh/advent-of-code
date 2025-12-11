// @ts-ignore
import input from "./inputs/4.txt";

const GRID: string[][] = input
  .split("\n")
  .map((line: string) => line.trim().replace(/\n$/, "").split(""))
  .filter((row: string) => row.length !== 0);

// prettier-ignore
const directions: number[][] = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1]
];

let accessible_first_half: number = 0;
let accessible_second_half: number = 0;

function get_neighbors(i: number, j: number): string[] {
  let neighbors: string[] = [];

  for (const [x, y] of directions) {
    if (i + x >= 0 && i + x < GRID.length) {
      if (j + y >= 0 && j + y < GRID[i].length) {
        neighbors.push(GRID[i + x][j + y]);
      }
    }
  }

  return neighbors;
}

// For first half
for (let i: number = 0; i < GRID.length; i++) {
  for (let j: number = 0; j < GRID[i].length; j++) {
    let space = GRID[i][j];

    if (space === ".") continue; // empty space

    let adjacents = 0;
    let neighbors: string[] = get_neighbors(i, j);

    for (const neighbor of neighbors) {
      if (neighbor === "@") adjacents++;
    }

    if (adjacents < 4) accessible_first_half++;
  }
}

// For second half
while (true) {
  let removed = false;

  for (let i: number = 0; i < GRID.length; i++) {
    for (let j: number = 0; j < GRID[i].length; j++) {
      let space = GRID[i][j];

      if (space === ".") continue; // empty space

      let adjacents = 0;
      let neighbors: string[] = get_neighbors(i, j);

      for (const neighbor of neighbors) {
        if (neighbor === "@") adjacents++;
      }

      if (adjacents < 4) {
        GRID[i][j] = ".";
        removed = true;
        accessible_second_half++;
      }
    }
  }

  if (!removed) break;
}

console.log("Accessible by forklifts first half:", accessible_first_half);
console.log("Accessible by forklifts second half:", accessible_second_half);
