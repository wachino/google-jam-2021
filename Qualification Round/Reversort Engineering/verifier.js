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

let dt = Array(101)
  .fill(null)
  .map(() => Array(1001).fill(null));

function solution() {
  for (let t = 0; t < 100000; t++) {
    let N = 100;
    let C = 1000;

    let tr =
      isPossible(N, C + 1) && bt(N, C + 1).length > 1
        ? solutionList(
            bt(N, C + 1)
              .slice(0, bt(N, C + 1).length - 1)
              .map(Number)
          )
        : false;
    if (tr && (tr.length != N || computeCost(tr) != C)) {
      console.error('EERRORR', { N, C });
    }
  }
}

function computeCost(list) {
  let cost = 0;
  let min;
  let minIdx;
  for (let i = 0; i < list.length - 1; i++) {
    min = list[i];
    minIdx = i;
    for (let j = i; j < list.length; j++) {
      if (list[j] < min) {
        min = list[j];
        minIdx = j;
      }
    }
    cost += minIdx - i + 1;
    list = [...list.slice(0, i), ...list.slice(i, minIdx + 1).reverse(), ...list.slice(minIdx + 1)];
  }
  return cost;
}

function solutionList(s) {
  let sol = Array(s.length)
    .fill(null)
    .map((_, i) => i + 1);
  for (let i = s.length - 1; i >= 0; i--) {
    sol = [...sol.slice(0, i), ...sol.slice(i, i + s[i]).reverse(), ...sol.slice(i + s[i])];
  }
  return sol;
}

function bt(n, c) {
  if (dt[n][c] == null) {
    if (!isPossible(n, c)) {
      dt[n][c] = 0;
    } else {
      let s = [0];
      for (let i = n; i > 0; i--) {
        s = bt(n - 1, c - i);
        if (s) {
          s = [i, ...s];
          break;
        }
      }
      dt[n][c] = s;
    }
  }

  return dt[n][c];
}

function isPossible(n, c) {
  return n <= c && c <= ((n + 1) * n) / 2;
}
