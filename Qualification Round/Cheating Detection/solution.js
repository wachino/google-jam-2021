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
  const P = Number(readLine());
  for (let t = 0; t < T; t++) {
    let students = Array(100)
      .fill(null)
      .map(() => readLine())
      .map((ans, i) => ({
        n: i + 1,
        ans,
        score: ans.split('1').length - 1,
      }))
      .sort((a, b) => a.score - b.score);

    let difficulty = Array(10000).fill(0);
    for (let i = 0; i < 10000; i++) {
      for (let j = 0; j < 100; j++) {
        if (students[j].ans[i] === '0') {
          difficulty[i]++;
        }
      }
    }
    let sortedQuestions = Array(10000)
      .fill(null)
      .map((_, i) => i)
      .sort((i, j) => difficulty[i] - difficulty[j]);

    students = students
      .map((s, i) => ({ ...s, cs: computeCheatingScore(i) }))
      .sort((r, s) => s.cs - r.cs);

    function getAnswer(student, question) {
      return students[student].ans[sortedQuestions[question]];
    }

    function computeCheatingScore(student) {
      const lastEasyQuestion = 1000;
      const firsHardQuestion = 9000;
      let easyScore = computePartialScore(student, 0, lastEasyQuestion);
      let easyNeigh = 0;
      if (student > 0) {
        easyNeigh += computePartialScore(student - 1, 0, lastEasyQuestion);
      }
      if (student < 99) {
        easyNeigh += computePartialScore(student + 1, 0, lastEasyQuestion);
      }
      if (student > 0 && student < 99) {
        easyNeigh /= 2;
      }
      let hardScore = computePartialScore(student, firsHardQuestion, 10000);
      let hardNeigh = 0;
      if (student > 0) {
        hardNeigh += computePartialScore(student - 1, firsHardQuestion, 10000);
      }
      if (student < 99) {
        hardNeigh += computePartialScore(student + 1, firsHardQuestion, 10000);
      }
      if (student > 0 && student < 99) {
        hardNeigh /= 2;
      }
      return easyNeigh - easyScore + (hardScore - hardNeigh);
    }

    function computePartialScore(student, firtsQ, lastQ) {
      let partialScore = 0;
      for (let i = firtsQ; i < lastQ; i++) {
        if (getAnswer(student, i) === '1') {
          partialScore++;
        }
      }
      return partialScore;
    }

    console.log(`Case #${t + 1}: ${students[0].n}`);
  }
}
