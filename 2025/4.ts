// @ts-ignore
import input from "./inputs/4.txt";

const GRID: string[][] = input
  .split("\n")
  .map((line: string) => line.trim().replace(/\n$/, "").split(""))
  .filter((row: string) => row.length !== 0);
const ROWS: number = GRID.length,
  COLS: number = GRID[0].length;
// prettier-ignore
const directions: number[][] = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1]
];
let accessible_first_half: number = 0;
let accessible_second_half: number = 0;

// pre-computing neighbors
let neighbors_grid: number[][] = Array.from({ length: ROWS }, () =>
  Array(COLS).fill(0),
);

type coord = {
  x: number;
  y: number;
};

function get_neighbors_locations(i: number, j: number): coord[] {
  let neighbors: coord[] = [];

  for (const [dx, dy] of directions) {
    let x: number = i + dx,
      y: number = j + dy;

    if (x >= 0 && x < ROWS && y >= 0 && y < COLS) {
      neighbors.push({ x, y });
    }
  }

  return neighbors;
}

for (let i: number = 0; i < ROWS; i++) {
  for (let j: number = 0; j < COLS; j++) {
    let neighbors_locations = get_neighbors_locations(i, j);
    let neighbors_count = 0;

    for (const { x, y } of neighbors_locations) {
      if (GRID[x][y] === "@") neighbors_count++;
    }

    neighbors_grid[i][j] = neighbors_count;
  }
}

// first-half
let removable_stack: coord[] = [];

for (let i: number = 0; i < ROWS; i++) {
  for (let j: number = 0; j < COLS; j++) {
    if (GRID[i][j] !== "." && neighbors_grid[i][j] < 4) {
      accessible_first_half++;
      removable_stack.push({ x: i, y: j });
    }
  }
}

console.log("Accessible by forklifts first half:", accessible_first_half);
console.log("Accessible by forklifts second half:", accessible_second_half);
