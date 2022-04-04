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

const fullCircleTicks = 12 * 10 ** 10 * 360;

function getAngles(t) {
  let h = t % fullCircleTicks;
  let m = (t * 12) % fullCircleTicks;
  let s = (t * 720) % fullCircleTicks;
  return [h, m, s];
}

function getRepresentation(t) {
  let h = Math.floor(t / (3600 * 1e9));
  t -= h * 3600 * 1e9;
  let m = Math.floor(t / (60 * 1e9));
  t -= m * 60 * 1e9;
  let s = Math.floor(t / 1e9);
  t -= s * 1e9;
  return { h, m, s, n: t };
}
function matchCanonical(a, b) {
  let diff = (a[0] - b[0] + fullCircleTicks) % fullCircleTicks;
  a = a.map((c) => (c - diff + fullCircleTicks) % fullCircleTicks);

  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
function solution() {
  const T = Number(readLine());
  for (let t = 0; t < T; t++) {
    let input = readLine().split(/\s+/).map(Number);
    let found = false;
    let ans;
    for (let i = 0; i < 3 && !found; i++) {
      for (let j = 0; j < 3 && !found; j++) {
        if (i != j) {
          k = 3 - i - j;
          let ah = input[i];
          let am = input[j];
          let as = input[k];
          let canonicalTry = [ah, am, as];
          for (let h = 0; h < 12 && !found; h++) {
            if ((h * 3600 * 1e9 - (ah - am)) % 11 === 0) {
              let n = (h * 3600 * 1e9 - (ah - am)) / 11;
              let t =
                (((h * 3600 * 1e9 + n) % fullCircleTicks) + fullCircleTicks) % fullCircleTicks;
              let can = getAngles(t);
              if (matchCanonical(canonicalTry, can)) {
                found = true;
                ans = t;
                break;
              }
            }
          }
        }
      }
    }
    let { h, m, s, n } = getRepresentation(ans);
    console.log(`Case #${t + 1}: ${h} ${m} ${s} ${n}`);
  }
}
