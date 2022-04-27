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
    let [R, C, F, S] = readLine().split(/\s+/).map(Number);

    let start = [];
    let end = [];
    for (let i = 0; i < R; i++) {
      start.push(
        readLine()
          .split('')
          .map((c) => c === 'M')
      );
    }
    for (let i = 0; i < R; i++) {
      end.push(
        readLine()
          .split('')
          .map((c) => c === 'M')
      );
    }

    let leftSide = [];
    let rightSide = [];
    for (let i = 0; i < R; i++) {
      for (let j = 0; j < C; j++) {
        if (start[i][j] !== end[i][j]) {
          if (start[i][j]) {
            leftSide.push({ i, j, justFlip: false });
          } else {
            rightSide.push({ i, j, justFlip: false });
          }
        }
      }
    }
    let n = Math.max(leftSide.length, rightSide.length);
    leftSide.push(
      ...Array(n - leftSide.length)
        .fill(null)
        .map(() => ({
          justFlip: true,
        }))
    );
    rightSide.push(
      ...Array(n - rightSide.length)
        .fill(null)
        .map(() => ({
          justFlip: true,
        }))
    );
    let matrix = Array(n)
      .fill(null)
      .map(() => Array(n).fill(null));

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (leftSide[i].justFlip || rightSide[j].justFlip) {
          matrix[i][j] = F;
        } else {
          matrix[i][j] = Math.min(
            2 * F,
            S *
              (Math.abs(leftSide[i].i - rightSide[j].i) + Math.abs(leftSide[i].j - rightSide[j].j))
          );
        }
      }
    }

    function costFunction(i, j) {
      if (i == 0 || i >= j || j == 2 * n + 1) {
        return 0;
      }

      if (i > 0 && j <= n) {
        return 0;
      }
      if (i > n && j > n && j < 2 * n + 1) {
        return 0;
      }

      return matrix[i - 1][j - n - 1];
    }
    function capacitytFunction(i, j) {
      if (i >= j) {
        return 0;
      }
      if (i == 0 && j > n) {
        return 0;
      }
      if (i <= n && j == 2 * n + 1) {
        return 0;
      }
      if (i > 0 && j <= n) {
        return 0;
      }
      if (i > n && j > n && j < 2 * n + 1) {
        return 0;
      }
      return 1;
    }
    let ans = minCostMaxFlow(costFunction, capacitytFunction, 2 * n + 2);
    console.log(`Case #${t + 1}: ${ans.totalCost}`);
  }
}

// source == 0 && sink == length-1
function minCostMaxFlow(costs, capacity, N) {
  let source = 0;
  let sink = N - 1;
  let visited = Array(N).fill(false);
  let distance = Array(N).fill(Infinity);
  let width = Array(N).fill(0);
  let totalFlow = 0;
  let totalCost = 0;
  let flow = Array(N)
    .fill(null)
    .map(() => Array(N).fill(0));
  let dad = Array(N)
    .fill(null)
    .map(() => ({ node: -1, dir: 0 }));
  let pick = Array(N).fill(0);

  let amount = dijkstra(source, sink);
  while (amount) {
    totalFlow += amount;

    for (let x = sink; x !== source; x = dad[x].node) {
      if (dad[x].dir === 1) {
        flow[dad[x].node][x] += amount;
        totalCost += amount * costs(dad[x].node, x);
      } else {
        flow[x][dad[x].node] -= amount;
        totalCost -= amount * costs(x, dad[x].node);
      }
    }
    amount = dijkstra(source, sink);
  }
  return { totalCost, totalFlow };

  function dijkstra(s, t) {
    visited = Array(N).fill(false);
    distance = Array(N).fill(Infinity);
    width = Array(N).fill(0);
    distance[s] = 0;
    width[s] = Infinity;
    while (s !== -1) {
      let best = -1;
      visited[s] = true;
      for (let k = 0; k < N; k++) {
        if (!visited[k]) {
          relax(s, k, capacity(s, k) - flow[s][k], costs(s, k), 1);
          relax(s, k, flow[k][s], -costs(k, s), -1);
          if (best == -1 || distance[k] < distance[best]) {
            best = k;
          }
        }
      }
      s = best;
    }
    for (let k = 0; k < N; k++) {
      pick[k] = Math.min(pick[k] + distance[k], Infinity);
    }
    return width[t];
  }

  function relax(s, k, cap, cost, dir) {
    let val = distance[s] + pick[s] - pick[k] + cost;
    if (cap > 0 && val < distance[k]) {
      distance[k] = val;
      dad[k] = { node: s, dir };
      width[k] = Math.min(cap, width[s]);
    }
  }
}
