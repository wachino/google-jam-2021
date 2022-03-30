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

var totalSum = 0n;
function solution() {
  const T = Number(readLine());
  for (let t = 0; t < T; t++) {
    totalSum = 0n;
    let M = Number(readLine());
    let primes = [];
    for (let i = 0; i < M; i++) {
      let [p, n] = readLine().split(/\s+/).map(BigInt);
      primes.push({ p: p, n });
      totalSum += p * n;
    }

    console.log(`Case #${t + 1}: ${compute(primes).toString()}`);
  }
}

function compute(originalPrimes) {
  for (let i = totalSum; i >= totalSum - 10000n; i--) {
    let primes = originalPrimes.slice().map((e) => ({ ...e }));
    let copySum = totalSum;
    let target = i;
    let nextPrime = 0;
    while (target > 1n && nextPrime < primes.length) {
      if (primes[nextPrime].n > 0 && target % primes[nextPrime].p === 0n) {
        primes[nextPrime].n--;
        copySum -= primes[nextPrime].p;
        target /= primes[nextPrime].p;
      }
      if (primes[nextPrime].n === 0n || target % primes[nextPrime].p !== 0n) {
        nextPrime++;
      }
    }

    if (target === 1n && i === copySum) {
      return copySum;
    }
  }
  return 0n;
}
