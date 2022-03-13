process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', (inputStdin) => {
  inputString += inputStdin;
});

process.stdin.on('end', (_) => {
  inputString = inputString
    .trim()
    .split('\n')
    .map((str) => str.trim());
  solution();
});

function readLine() {
  return inputString[currentLine++];
}

function solution() {
  const T = Number(readLine());
  for (let t = 0; t < T; t++) {
    var [X, Y, mural] = readLine().split(/\s+/);
    X = Number(X);
    Y = Number(Y);
    mural = mural.split('').map((c) => (c === 'C' ? false : c === 'J' ? true : null));
    let cost = 0;
    let prev = null;
    for (let i = 0; i < mural.length; i++) {
      let j = i;
      let last = null;
      while (i < mural.length && mural[i] == null) {
        i++;
      }
      if (j != i) {
        if (i < mural.length) {
          last = mural[i];
        }
        cost += best(i - j, prev, last);
      } else {
        if (prev !== null) {
          cost += pairCost(prev, mural[i]);
        }
      }
      if (i < mural.length) {
        prev = mural[i];
      }
    }
    console.log(`Case #${t + 1}: ${cost}`);
  }

  function best(len, first, last) {
    let c1 = arrayCost([
      first,
      ...Array(len)
        .fill(null)
        .map(() => false),
      last,
    ]);
    let c2 = arrayCost([
      first,
      ...Array(len)
        .fill(null)
        .map(() => true),
      last,
    ]);
    let c3 = arrayCost([
      first,
      ...Array(len)
        .fill(null)
        .map((_, i) => i % 2 === 0),
      last,
    ]);
    let c4 = arrayCost([
      first,
      ...Array(len)
        .fill(null)
        .map((_, i) => i % 2 !== 0),
      last,
    ]);

    return Math.min(c1, c2, c3, c4);
  }

  function arrayCost(arr) {
    let cost = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      cost += pairCost(arr[i], arr[i + 1]);
    }

    return cost;
  }

  function pairCost(a, b) {
    if (a === null || b === null || a === b) {
      return 0;
    }
    return b ? X : Y;
  }
}
