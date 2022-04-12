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
    let [S, E] = readLine().split(/\s+/);
    let k = getBitGroups(S);
    let l = getBitGroups(E);
    let ans = S === E ? 0 : -1;
    let extraBit = S[S.length - 1] === '0' ? 1 : 0;
    let zero = S;
    if (extraBit) {
      zero = not(zero);
      if (zero === E) {
        ans = 1;
      }
    }
    let notToRemoveS = 0;
    while (zero !== '0') {
      zero = not(zero);
      notToRemoveS++;
    }
    if (l <= notToRemoveS + 1 && (ans == -1 || ans > notToRemoveS + E.length + +extraBit)) {
      ans = notToRemoveS + E.length + +extraBit;
    }

    let sprima = S;
    for (let x = 0; x <= k; x++) {
      if (isPreffix(sprima, E)) {
        let y = E.length - sprima.length;
        let suffix = E.substr(sprima.length);
        let m = getBitGroups(suffix);
        let z = m - 1;
        if ((suffix[0] == '1' && m % 2) | (suffix[0] == '0' && m % 2 === 0)) {
          z++;
        }
        if (S === '0') {
          z++;
        }
        if (z <= x) {
          if (ans == -1 || x + y < ans) {
            ans = x + y;
          }
        }
      }
      sprima = not(sprima);
    }
    console.log(`Case #${t + 1}: ${ans === -1 ? 'IMPOSSIBLE' : ans}`);
  }
}

function double(W) {
  return W + '0';
}

function not(W) {
  let ans = W.split('').map((c) => (c === '1' ? '0' : '1'));
  let firstSignificant = ans.indexOf('1');
  if (firstSignificant >= 0) {
    return ans.slice(firstSignificant).join('');
  } else {
    return '0';
  }
}

function isPreffix(pref, word) {
  return pref == word.substr(0, pref.length);
}

function getBitGroups(W) {
  let bitGroups = 0;
  let lastBit = null;
  for (let i = 0; i < W.length; i++) {
    if (W[i] !== lastBit) {
      lastBit = W[i];
      bitGroups++;
    }
  }
  return bitGroups;
}
