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

async function solve() {
  let line = await generator.next();
  const [T, N, Q] = line.value.trim().split(' ').map(Number);

  for (let t = 0; t < T; t++) {
    const answer = await findAnswer(N);
    console.log(answer.join(' '));

    let veredict = await readNum();
    if (veredict === -1) {
      break;
    }
  }

  rl.close();
  process.stdin.destroy();
}

var nqueries;
async function findAnswer(N) {
  let solution = Array(N)
    .fill(null)
    .map((_, i) => i + 1);
  nqueries = 0;

  if (solution.length < 3) {
    return solution;
  }
  let m = await query(solution[0], solution[1], solution[2]);
  if (solution[0] === m) {
    swap(solution, 0, 1);
  } else if (solution[2] === m) {
    swap(solution, 1, 2);
  }
  for (let j = 3; j < solution.length; j++) {
    let elem = solution[j];
    let size = j;
    let w = await whereToInsertTernary(solution, size, elem);
    solution.splice(j, 1);
    solution.splice(w, 0, elem);
  }
  return solution;
}
async function whereToInsertBinary(list, size, element) {
  let left = 0;
  let right = size - 1;
  let maximal = list[size - 1];
  let m;
  while (left < right) {
    try {
      m = Math.floor((left + right) / 2);
      if (await isALessThanB(element, list[m], maximal)) {
        right = m;
      } else {
        left = m + 1;
      }
    } catch (e) {
      return size;
    }
  }
  return left;
}

async function whereToInsertTernary(list, size, element) {
  let left = 0;
  let right = size - 1;
  let m1;
  let m2;
  while (left < right) {
    if (left + 1 === right) {
      m1 = left;
      m2 = right;
    } else {
      m1 = left + Math.floor((right - left + 1) / 3);
      m2 = m1 + Math.floor((right - left + 1) / 3);
    }
    let q = await query(list[m1], element, list[m2]);
    if (q === element) {
      left = m1 + 1;
      right = m2;
    } else if (q === list[m1]) {
      right = m1;
    } else {
      left = m2 + 1 < right || m2 === right ? m2 + 1 : m2;
    }
  }
  return left;
}

function swap(list, a, b) {
  let tmp = list[a];
  list[a] = list[b];
  list[b] = tmp;
}

async function isALessThanB(a, b, maximal) {
  let m = await query(a, b, maximal);
  if (m === maximal) {
    throw `${maximal} is not maximal`;
  }
  return m == b;
}

async function query(a, b, c) {
  console.log([a, b, c].join(' '));
  nqueries++;
  return await readNum();
}

async function readNum() {
  let tmp = await generator.next();
  return Number(tmp.value);
}

solve();
