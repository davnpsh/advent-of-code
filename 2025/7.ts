// @ts-ignore
import input from "./inputs/7.txt";

const TACHYON_MANIFOLD: string[][] = input
  .split("\n")
  .map((line: string) => line.trim().replace(/\n$/, "").split(""))
  .filter((row: Array<string>) => row.length !== 0);
const ROWS: number = TACHYON_MANIFOLD.length;
const COLS: number = TACHYON_MANIFOLD[0].length;

let splits: number = 0;

for (let i: number = 0; i < ROWS; i++) {
  for (let j: number = 0; j < COLS; j++) {
    let elem: string = TACHYON_MANIFOLD[i][j];

    // starting point
    if (elem === "S") {
      TACHYON_MANIFOLD[i + 1][j] = "|";
    }

    if (elem === "|" && i < TACHYON_MANIFOLD.length - 1) {
      let below = TACHYON_MANIFOLD[i + 1][j];

      if (below === "^") {
        // this asumes j - 1 and j + 1 are always in range
        TACHYON_MANIFOLD[i + 1][j - 1] = "|";
        TACHYON_MANIFOLD[i + 1][j + 1] = "|";

        splits++;
      } else {
        TACHYON_MANIFOLD[i + 1][j] = "|";
      }
    }
  }
}

console.log("Splits:", splits);
