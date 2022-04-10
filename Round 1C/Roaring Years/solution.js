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

function f(n, x) {
  return BigInt(
    Array(n)
      .fill(x)
      .map((c, i) => c + BigInt(i))
      .join('')
  );
}

function upperBound(n, x) {
  let left = 1n;
  let right = 1234567891011121314n;
  let mid, v;
  while (left < right) {
    mid = (left + right) >> 1n;
    v = f(n, mid);
    if (v <= x) {
      left = mid + 1n;
    } else {
      right = mid;
    }
  }
  return f(n, left);
}

function solution() {
  const T = Number(readLine());
  for (let t = 0; t < T; t++) {
    let year = BigInt(readLine().trim());
    let ans = -1;
    for (let n = 2; n <= year.toString().length + 2; n++) {
      let v = upperBound(n, year);
      if (ans === -1 || v < ans) {
        ans = v;
      }
    }

    console.log(`Case #${t + 1}: ${ans}`);
  }
}
