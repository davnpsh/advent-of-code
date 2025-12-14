// @ts-ignore
import input from "./inputs/7.txt";

type TNode = {
  children?: TNode[];
};

const TACHYON_MANIFOLD: string[][] = input
  .split("\n")
  .map((line: string) => line.trim().replace(/\n$/, "").split(""))
  .filter((row: Array<string>) => row.length !== 0);
const ROWS: number = TACHYON_MANIFOLD.length;
const COLS: number = TACHYON_MANIFOLD[0].length;

let ptr: TNode = {};
let tn_stack: TNode[] = [ptr];

let splits: number = 0;

for (let i: number = 0; i < ROWS; i++) {
  for (let j: number = 0; j < COLS; j++) {
    let elem: string = TACHYON_MANIFOLD[i][j];

    // starting point
    if (elem === "S") {
      TACHYON_MANIFOLD[i + 1][j] = "|";
    }

    if (elem === "|" && i < TACHYON_MANIFOLD.length - 1) {
      let tnode: TNode = tn_stack.shift()!;
      let below = TACHYON_MANIFOLD[i + 1][j];

      if (below === "^") {
        // new nodes
        // left, can be a new node of the right child of a another node
        let left: TNode =
          TACHYON_MANIFOLD[i + 1][j - 1] === "|"
            ? tn_stack[tn_stack.length - 1]
            : {};
        // right will always be generated
        let right: TNode = {};

        // assign children
        tnode!.children = [left, right];

        // push to stack
        if (TACHYON_MANIFOLD[i + 1][j - 1] !== "|") tn_stack.push(left);
        tn_stack.push(right);

        // this asumes j - 1 and j + 1 are always in range
        TACHYON_MANIFOLD[i + 1][j - 1] = "|";
        TACHYON_MANIFOLD[i + 1][j + 1] = "|";

        splits++;
      } else {
        TACHYON_MANIFOLD[i + 1][j] = "|";
        tn_stack.push(tnode);
      }
    }
  }
}

// console.log(TACHYON_MANIFOLD.map((row: string[]) => row.join("")));
console.log(ptr);

console.log("Splits:", splits);
