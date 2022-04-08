const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity,
});

async function* getGenerator() {
  for await (const line of rl) {
    yield line;
  }
}
const generator = getGenerator();

let dp = Array(21)
  .fill(null)
  .map(() =>
    Array(21)
      .fill(null)
      .map(() =>
        Array(21)
          .fill(null)
          .map(() => Array(13).fill(-1))
      )
  );

function getBestExpectedFor(nFull, nAlmost, nTwoToFill, hOther) {
  if (dp[nFull][nAlmost][nTwoToFill][hOther] === -1) {
    let pathByDigit = Array(10).fill(0);
    let bestVal = 0;
    for (let d = 0; d < 10; d++) {
      let currBest = -1;
      if (nFull + nAlmost + nTwoToFill < 20) {
        if (hOther === 12) {
          let { bestVal: tmpBestVal } = getBestExpectedFor(nFull, nAlmost, nTwoToFill + 1, 0);
          if (tmpBestVal + d * 10 ** (hOther - 5) > currBest) {
            currBest = tmpBestVal + d * 10 ** (hOther - 5);
            pathByDigit[d] = hOther;
          }
        } else {
          let { bestVal: tmpBestVal } = getBestExpectedFor(nFull, nAlmost, nTwoToFill, hOther + 1);
          if (tmpBestVal + d * 10 ** (hOther - 5) > currBest) {
            currBest = tmpBestVal + d * 10 ** (hOther - 5);
            pathByDigit[d] = hOther;
          }
        }
      }
      if (nTwoToFill) {
        let { bestVal: tmpBestVal } = getBestExpectedFor(
          nFull,
          nAlmost + 1,
          nTwoToFill - 1,
          hOther
        );
        if (tmpBestVal + d * 10 ** (13 - 5) > currBest) {
          currBest = tmpBestVal + d * 10 ** (13 - 5);
          pathByDigit[d] = 13;
        }
      }
      if (nAlmost) {
        let { bestVal: tmpBestVal } = getBestExpectedFor(
          nFull + 1,
          nAlmost - 1,
          nTwoToFill,
          hOther
        );
        if (tmpBestVal + d * 10 ** (14 - 5) > currBest) {
          currBest = tmpBestVal + d * 10 ** (14 - 5);
          pathByDigit[d] = 14;
        }
      }
      bestVal += currBest / 10;
    }
    dp[nFull][nAlmost][nTwoToFill][hOther] = { pathByDigit, bestVal };
  }
  return dp[nFull][nAlmost][nTwoToFill][hOther];
}
async function solve() {
  let line = await generator.next();
  let [T, N, B, P] = line.value.trim().split(/\s+/);
  T = Number(T);
  N = Number(N);
  B = Number(B);
  P = BigInt(P);
  dp[20][0][0][0] = { pathByDigit: [], bestVal: 0 };
  for (let t = 0; t < T; t++) {
    await findAnswer(N, B);
  }
  let veredict = await readNum();
  if (veredict === -1) {
    throw 'Wrong answer';
  }

  rl.close();
  process.stdin.destroy();
}

async function findAnswer(N, B) {
  let towerLengths = Array(N).fill(0);
  let nFull = 0;
  let nAlmost = 0;
  let nTwoToFill = 0;
  let hOther = 0;
  for (let i = 0; i < N * B; i++) {
    let digit = await readNum();
    if (digit == -1) {
      throw 'Error';
    }
    let nextTowerHeight = getBestExpectedFor(nFull, nAlmost, nTwoToFill, hOther).pathByDigit[digit];
    if (nextTowerHeight === 14) {
      nFull++;
      nAlmost--;
    } else if (nextTowerHeight === 13) {
      nAlmost++;
      nTwoToFill--;
    } else if (nextTowerHeight === 12) {
      nTwoToFill++;
      hOther = 0;
    } else {
      hOther++;
    }
    let nextTower = towerLengths.findIndex((h) => h === nextTowerHeight);

    console.log(nextTower + 1);
    towerLengths[nextTower]++;
  }
  return;
}

async function readNum() {
  let tmp = await generator.next();
  return Number(tmp.value);
}

solve();
