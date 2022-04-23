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

function bestFor(t, q) {
  if (t < 0 || t % q) {
    return -Infinity;
  }
  if (t === 0) {
    return 0;
  }
  let best = -Infinity;
  for (let i = 2; i * q <= t; i++) {
    let p = i * q;
    let curr = bestFor(t - p, p);
    if (Number.isFinite(curr) && curr >= best) {
      best = 1 + curr;
    }
  }
  return best;
}
function solution() {
  const T = Number(readLine());
  for (let t = 0; t < T; t++) {
    let N = Number(readLine());
    let ans = 1;
    for (let q = 3; q <= N; q++) {
      if (N % q) {
        continue;
      }
      let curr = bestFor(N - q, q) + 1;
      if (curr > ans) {
        ans = curr;
      }
    }
    console.log(`Case #${t + 1}: ${ans}`);
  }
}
