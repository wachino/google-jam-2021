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
    let N = Number(readLine());
    let members = readLine().split(/\s+/).map(BigInt);
    let min = 0;
    for (let i = 1; i < members.length; i++) {
      let next = nextGreater(members[i - 1], members[i]);
      min += next.toString().length - members[i].toString().length;
      members[i] = next;
    }
    console.log(`Case #${t + 1}: ${min}`);
  }
}

function nextGreater(a, b) {
  if (a < b) {
    return b;
  }
  if (a < b * 10n + 9n) {
    for (let i = 0n; i < 10n; i++) {
      if (a < b * 10n + i) {
        return b * 10n + i;
      }
    }
  } else {
    let m = nextGreater(a, b * 10n);
    if (
      a.toString().substr(0, b.toString().length) === b.toString() &&
      a.toString().length > b.toString().length
    ) {
      let n;
      for (let i = 1n; i < 10n; i++) {
        n = nextGreater(a, b * 10n + i);
        if (n < m) {
          m = n;
        }
      }
    }
    return m;
  }
}
