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

const binomial = Array(125)
  .fill(null)
  .map(() => Array(125).fill(0n));

function fillBinomial() {
  binomial[0][0] = 1n;
  for (let i = 1; i < 125; i++) {
    binomial[i][0] = 1n;
    for (let j = 1; j <= i; j++) {
      binomial[i][j] = binomial[i - 1][j - 1] + binomial[i - 1][j];
    }
  }
}

function solveForOneStudent(student) {
  let q = student.answers.length;
  let s = student.score;
  let rev = q - s > s;
  let scoreNum = Math.max(s, q - s);
  let answers = student.answers.map((c) => c ^ rev);
  return { answers, score: { num: scoreNum, den: 1 } };
}

function solveForTwoStudents(a, b) {
  let s1 = solveForOneStudent(a);
  let s2 = solveForOneStudent(b);
  return s1.score.num > s2.score.num ? s1 : s2;
}

function solveForThreeStudents(students, q) {
  let questionsByType = Array(4).fill(0);
  let scoreByComb = Array(16).fill(0n);
  let combByStudent = [0, 3, 5];

  for (let i = 0; i < q; i++) {
    let type = getTypeOfQuestion(students, i);

    questionsByType[type]++;
  }
  let totalWays = 0n;
  for (let a = 0; a <= questionsByType[0]; a++) {
    for (let b = 0; b <= questionsByType[1]; b++) {
      for (let c = 0; c <= questionsByType[2]; c++) {
        let d = students[0].score - (a + b + c);
        if (d < 0 || d > questionsByType[3]) {
          continue;
        }
        let match = true;
        for (let s = 1; s < students.length; s++) {
          let e = getScore(questionsByType, combByStudent[s], [a, b, c, d]);
          if (students[s].score !== e) {
            match = false;
            break;
          }
        }
        if (match) {
          let ex =
            binomial[questionsByType[0]][a] *
            binomial[questionsByType[1]][b] *
            binomial[questionsByType[2]][c] *
            binomial[questionsByType[3]][d];

          totalWays += ex;
          for (let i = 0; i < 16; i++) {
            scoreByComb[i] += BigInt(getScore(questionsByType, i, [a, b, c, d])) * ex;
          }
        }
      }
    }
  }
  let best = 0n;
  let bestComb = 0;
  for (let i = 0; i < 16; i++) {
    if (scoreByComb[i] > best) {
      best = scoreByComb[i];
      bestComb = i;
    }
  }

  let g = gcd(best, totalWays);
  best /= g;
  totalWays /= g;
  let answers = students[0].answers.map((c, i) =>
    (1 << (3 - getTypeOfQuestion(students, i))) & bestComb ? 1 - c : c
  );

  return { answers, score: { num: best, den: totalWays } };
}
function solution() {
  fillBinomial();

  const T = Number(readLine());
  for (let t = 0; t < T; t++) {
    let [n, q] = readLine().split(/\s+/).map(Number);
    let students = [];
    for (let i = 0; i < n; i++) {
      let [answers, score] = readLine().split(/\s+/);
      students.push({
        answers: answers.split('').map((c) => (c === 'T' ? 1 : 0)),
        score: Number(score),
      });
    }
    let sol;
    if (students.length == 1) {
      sol = solveForOneStudent(students[0]);
    } else if (students.length === 2) {
      sol = solveForTwoStudents(students[0], students[1]);
    } else {
      sol = solveForThreeStudents(students, q);
    }

    let ans = sol.answers.map((c) => (c ? 'T' : 'F')).join('');
    console.log(`Case #${t + 1}: ${ans} ${sol.score.num}/${sol.score.den}`);
  }
}

function getScore(questionsByType, combOfFirstByType, falseByType) {
  let expected = 0;
  for (let i = 0; i < 4; i++) {
    if ((1 << (3 - i)) & combOfFirstByType) {
      expected += questionsByType[i] - falseByType[i];
    } else {
      expected += falseByType[i];
    }
  }
  return expected;
}

function getTypeOfQuestion(students, i) {
  let a = students[0].answers[i];
  let b = students[1].answers[i];
  let c = students[2].answers[i];
  let type = (a << 2) | (b << 1) | c;
  if (type >= 4) {
    type ^= 7;
  }
  return type;
}

function gcd(a, b) {
  if (!b) {
    return a;
  }
  return gcd(b, a % b);
}
