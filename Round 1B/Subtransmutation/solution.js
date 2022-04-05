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
    const [N, A, B] = readLine().split(/\s+/).map(Number);
    let metalsGoal = readLine().split(/\s+/).map(Number);

    let sol;
    for (let i = N + 1; i <= 402; i++) {
      let found = isSolution(i, metalsGoal, A, B);
      if (found) {
        sol = i;
        break;
      }
    }
    if (!sol) {
      sol = 'IMPOSSIBLE';
    }
    console.log(`Case #${t + 1}: ${sol}`);
  }
}

function isSolution(l, metalsGoal, A, B) {
  let currentSol = new Array(l);
  currentSol[l - 1] = 1;
  for (let i = l - 1; i >= 0; i--) {
    let rest = (currentSol[i] || 0) - (metalsGoal[i] || 0);
    if (rest < 0) {
      return false;
    }
    if (rest > 0) {
      currentSol[i] -= rest;
      if (i - A >= 0) {
        currentSol[i - A] = (currentSol[i - A] || 0) + rest;
      }
      if (i - B >= 0) {
        currentSol[i - B] = (currentSol[i - B] || 0) + rest;
      }
    }
  }
  return true;
}
