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

const MOD = 1000000007n;
const fact = Array(100001).fill(1n);
const invFact = Array(100001).fill(1n);
let indexesByNumber = Array(100001).fill(null);

function computeFactorial() {
  for (let i = 1; i <= 100000; i++) {
    fact[i] = (fact[i - 1] * BigInt(i)) % MOD;
    invFact[i] = modInverse(fact[i]);
  }
}

function lastIndexOfN(n, l, r) {
  let idx = indexesByNumber[n];
  if (!idx) {
    return -1;
  }
  let a = 0;
  let b = idx.length - 1;
  let mid = (a + b + 1) >> 1;
  while (a < b) {
    if (idx[mid] > r) {
      b = mid - 1;
    } else {
      a = mid;
    }
    mid = (a + b + 1) >> 1;
  }
  if (idx[a] < l || idx[a] > r) {
    return -1;
  }

  return idx[a];
}

function getCombs(V, l, r, pivot) {
  if (l >= r) {
    return 1n;
  }
  let m = lastIndexOfN(pivot, l, r - 1);

  if (m === -1) {
    return 0n;
  }
  let p = m - l;

  return (
    (((nChooseK(r - l - 1, p) * getCombs(V, l, m, pivot)) % MOD) *
      getCombs(V, m + 1, r, pivot + 1)) %
    MOD
  );
}

function nChooseK(n, k) {
  if (n < 0 || k < 0 || n < k) {
    return 0;
  }
  return (((fact[n] * invFact[k]) % MOD) * invFact[n - k]) % MOD;
}

function solution() {
  const T = Number(readLine());
  computeFactorial();
  for (let t = 0; t < T; t++) {
    let N = Number(readLine());
    let V = readLine().split(/\s+/).map(Number);
    indexesByNumber = Array(100001).fill(null);
    for (let i = 0; i < N; i++) {
      if (!indexesByNumber[V[i]]) {
        indexesByNumber[V[i]] = [];
      }
      indexesByNumber[V[i]].push(i);
    }
    let ans = getCombs(V, 0, N, 1);
    console.log(`Case #${t + 1}: ${ans}`);
  }
}

function modInverse(a) {
  return power(a, MOD - 2n);
}

// To compute x^y under modulo MOD
function power(x, y) {
  if (y == 0n) return 1n;
  let p = power(x, y / 2n) % MOD;
  p = (p * p) % MOD;

  return y % 2n == 0n ? p : (x * p) % MOD;
}
