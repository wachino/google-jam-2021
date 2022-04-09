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
    let [N, K] = readLine().split(/\s+/).map(Number);
    let soldTickets = readLine().split(/\s+/).map(Number);
    let amin, amax, ak;
    let bmin, bmax, bk;
    let adist = 0;
    let bdist = 0;
    let aplus = true;
    soldTickets.sort((a, b) => a - b);
    if (soldTickets[0] > 1) {
      ak = soldTickets[0] - 1;
      adist = ak;
      amin = 1;
      amax = ak;
      aplus = false;
    }
    if (
      soldTickets[soldTickets.length - 1] < K &&
      K - soldTickets[soldTickets.length - 1] > adist
    ) {
      ak = soldTickets[soldTickets.length - 1] + 1;
      adist = K - ak + 1;
      amin = ak;
      amax = K;
      aplus = true;
    }
    for (let i = 0; i < soldTickets.length; i++) {
      if (
        i > 0 &&
        soldTickets[i] - 1 > 1 &&
        adist < Math.floor((soldTickets[i] - soldTickets[i - 1]) / 2)
      ) {
        adist = Math.floor((soldTickets[i] - soldTickets[i - 1]) / 2);
        amax = soldTickets[i] - 1;
        ak = amax;
        amin = amax - adist + 1;
        aplus = false;
      }
      if (
        i < soldTickets.length - 1 &&
        soldTickets[i] + 1 < K &&
        adist < Math.floor((soldTickets[i + 1] - soldTickets[i]) / 2)
      ) {
        adist = Math.floor((soldTickets[i + 1] - soldTickets[i]) / 2);
        amin = soldTickets[i] + 1;
        amax = amin + adist - 1;
        ak = amin;
        aplus = true;
      }
    }
    soldTickets.push(ak);
    soldTickets.sort((a, b) => a - b);

    if (soldTickets[0] !== ak && soldTickets[0] > 1) {
      bk = soldTickets[0] - 1;
      bdist = bk;
      bmin = 1;
      bmax = bk;
    }
    if (
      soldTickets[soldTickets.length - 1] !== ak &&
      soldTickets[soldTickets.length - 1] < K &&
      K - soldTickets[soldTickets.length - 1] > bdist
    ) {
      bk = soldTickets[soldTickets.length - 1] + 1;
      bdist = K - bk + 1;
      bmin = bk;
      bmax = K;
    }
    for (let i = 0; i < soldTickets.length; i++) {
      if (i > 0 && (soldTickets[i] !== ak || aplus) && soldTickets[i] - 1 > 1) {
        let tdist =
          soldTickets[i - 1] !== ak
            ? Math.floor((soldTickets[i] - soldTickets[i - 1]) / 2)
            : soldTickets[i] - soldTickets[i - 1] - adist;

        if (tdist > bdist) {
          bdist = tdist;
          bmax = soldTickets[i] - 1;
          bmin = bmax - bdist + 1;
        }
      }
      if (
        i < soldTickets.length - 1 &&
        (soldTickets[i] !== ak || !aplus) &&
        soldTickets[i] + 1 < K &&
        bdist < Math.floor((soldTickets[i + 1] - soldTickets[i]) / 2)
      ) {
        let tdist =
          soldTickets[i + 1] !== ak
            ? Math.floor((soldTickets[i + 1] - soldTickets[i]) / 2)
            : soldTickets[i + 1] - soldTickets[i] - adist;
        if (tdist > bdist) {
          bdist = tdist;
          bmin = soldTickets[i] + 1;
          bmax = bmin + bdist - 1;
        }
      }
    }

    let prob = (adist + bdist) / K;
    console.log(`Case #${t + 1}: ${prob}`);
  }
}
