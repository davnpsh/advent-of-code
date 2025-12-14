// @ts-ignore
import input from "./inputs/7.txt";

const TACHYON_MANIFOLD: string[][] = input
  .split("\n")
  .map((line: string) => line.trim().replace(/\n$/, "").split(""))
  .filter((row: Array<string>) => row.length !== 0);
const ROWS: number = TACHYON_MANIFOLD.length;
const COLS: number = TACHYON_MANIFOLD[0].length;

let splits: number = 0;
let timelines: number = 0;
let scan: number[] = Array(COLS).fill(0);

for (let i: number = 0; i < ROWS; i++) {
  let lvl_scan: number[] = Array(COLS).fill(0);
  for (let j: number = 0; j < COLS; j++) {
    let elem: string = TACHYON_MANIFOLD[i][j];

    // starting point
    if (elem === "S") {
      TACHYON_MANIFOLD[i + 1][j] = "|";
      lvl_scan[j] = 1;
    }

    if (elem === "|" && i < TACHYON_MANIFOLD.length - 1) {
      let below = TACHYON_MANIFOLD[i + 1][j];

      if (below === "^") {
        // this asumes j - 1 and j + 1 are always in range
        TACHYON_MANIFOLD[i + 1][j - 1] = "|";
        TACHYON_MANIFOLD[i + 1][j + 1] = "|";

        splits++;

        lvl_scan[j - 1] += scan[j];
        lvl_scan[j + 1] += scan[j];
      } else {
        TACHYON_MANIFOLD[i + 1][j] = "|";
        lvl_scan[j] += scan[j];
      }
    }
  }
  if (i < ROWS - 1) scan = lvl_scan;
}

timelines = scan.reduce((sum, i) => sum + i, 0);

console.log("Splits:", splits);
console.log("Timelines:", timelines);
