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
  const T = Number(readLine());
  for (let t = 0; t < T; t++) {
    let [N, C] = readLine().split(/\s+/).map(Number);

    console.log(
      `Case #${t + 1}: ${
        isPossible(N, C + 1) && bt(N, C + 1).length > 1
          ? solutionList(
              bt(N, C + 1)
                .slice(0, bt(N, C + 1).length - 1)
                .map(Number)
            ).join(' ')
          : 'IMPOSSIBLE'
      }`
    );
  }
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
