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
  let [T, N] = line.value.trim().split(/\s+/).map(Number);

  for (let t = 0; t < T; t++) {
    await findAnswer(N);
    let veredict = await readNum();
    if (veredict === -1) {
      throw 'Wrong answer';
    }
  }

  rl.close();
  process.stdin.destroy();
}

async function findAnswer(N) {
  let lastOrdered = 1;
  for (let i = 1; i < N; i++) {
    let q = await query(lastOrdered, N);
    if (q === -1) {
      debugger;
    }
    if (q > lastOrdered) {
      let ans = await swap(lastOrdered++, q);
      if (ans === -1) {
        debugger;
      }
    } else {
      lastOrdered++;
    }
  }
  console.log('D');
  return;
}

async function query(i, j) {
  console.log(`M ${i} ${j}`);
  return await readNum();
}

async function swap(i, j) {
  console.log(`S ${i} ${j}`);
  return await readNum();
}

async function readNum() {
  let tmp = await generator.next();
  return Number(tmp.value);
}

solve();
