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
    let list = readLine().split(/\s+/).map(Number);
    let cost = 0;
    let min;
    let minIdx;
    for (let i = 0; i < list.length - 1; i++) {
      min = list[i];
      minIdx = i;
      for (let j = i; j < list.length; j++) {
        if (list[j] < min) {
          min = list[j];
          minIdx = j;
        }
      }
      cost += minIdx - i + 1;
      list = [
        ...list.slice(0, i),
        ...list.slice(i, minIdx + 1).reverse(),
        ...list.slice(minIdx + 1),
      ];
    }
    console.log(`Case #${t + 1}: ${cost}`);
  }
}
