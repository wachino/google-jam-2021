# Hacked Exam

## Solution code

See [solution source code](/Round%201A/Hacked%20Exam/solution.js)

## Analysis

You can see [solution analysis](/Round%201A/Hacked%20Exam/analysis.md) extracted from Google webpage.

## Problem

There is an exam with **Q** true or false questions. The correct answer to each question is either `T` or `F`. Each student taking the exam selects either `T` or `F` for each question, and the student's score is the number of questions they answer correctly.

![Hacked Exam Example](/images/round-a-hacked-exam.png)

There are **N** students who have already taken this exam. For each of those students, you know the answers they gave to each question and their final score. Assuming that any sequence of answers that is consistent with all of those students' scores has the same probability of being the correct sequence of answers, you want to maximize your own expected score. Determine what that expected score is and how to answer the questions so that you achieve it.

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow. The first line of each test case contains two integers **N** and **Q**: the number of students and the number of questions, respectively. Each of the next **N** lines contains a string **A<sub>i</sub>** and an integer **S<sub>i</sub>**: the `i`-th student's answers and their score, respectively. The `j`-th character of **A<sub>i</sub>** is either `T` or `F`, representing the answer the `i`-th student gave to the `j`-th question.

## Output

For each test case, output one line containing `Case #x: y z/w`, where `x` is the test case number (starting from `1`), `y` is a string representing a sequence of answers that yields the maximum expected score (in the same format as the input), and `z/w` is the maximum expected score as an irreducible fraction (that is, `w` must be positive and of minimum possible value).

## Limits

Time limit: 30 seconds.<br>
Memory limit: 1 GB.<br>
1≤**T**≤2021.<br>
The length of **A<sub>i</sub>**=**Q**, for all `i`.<br>
Each character of **A<sub>i</sub>** is an uppercase `T` or an uppercase `F`, for all `i`.<br>
0≤**S<sub>i</sub>**≤**Q**, for all `i`.<br>
There exists at least one sequence of correct answers consistent with the input.<br>

## Test Set 1 (Visible Verdict)

1≤**N**≤2.
1≤**Q**≤10.

## Test Set 2 (Hidden Verdict)

1≤**N**≤2.
1≤**Q**≤40.

## Test Set 3 (Hidden Verdict)

1≤**N**≤3.
1≤**Q**≤120.

## Sample

_Note: there are additional samples that are not run on submissions down below._

| Input    | Output              |
| -------- | ------------------- |
| 4        |                     |
| 1 3      | Case #1: FFT 3/1    |
| FFT 3    |                     |
| 1 3      | Case #2: FFT 2/1    |
| FFT 2    |                     |
| 2 6      | Case #3: FTFFFT 4/1 |
| FFTTTF 2 |                     |
| FTFTFT 4 |                     |
| 2 2      | Case #4: TF 1/1     |
| FF 1     |                     |
| TT 1     |                     |

In Sample Case #1, given that the score for `FFT` is `3`, the sequence of correct answers must be `FFT`.

In Sample Case #2, given that the score for `FFT` is `2`, the sequence of correct answers is `FFF`, `FTT`, or `TFT`, each with probability `13`. Your best strategy is to answer `FFT`, to achieve the expected score of `13×2+13×2+13×2=2`.

In Sample Case #3, there are other answers that also achieve an expected score of `4`, like `FTFTFT`.

In Sample Case #4, one of the questions' answer is `T` and the other one is `F`, but you do not know which is which. Answering `TF` or `FT` scores you `2` with probability `12` and `0` with probability `12`, yielding an expected score of `1`. Answering `FF` or `TT` guarantees a score of `1`. Since any sequence of answers gives the same expected score, you can output any of them.

## Additional Sample - Test Set 3

_The following additional sample fits the limits of Test Set 3. It will not be run against your submitted solutions._

| Input                                                | Output                                                 |
| ---------------------------------------------------- | ------------------------------------------------------ |
| [input](/Round%201A/Hacked%20Exam/input-example.txt) | [output](/Round%201A/Hacked%20Exam/output-example.txt) |

In the Sample Case for Test Set 3, you can get an expected score over `65`, which is higher than the actual score of any of the other students. Notice that both the numerator and denominator of the expected score can be significantly larger than 2<sup>64</sup> (the numerator in this case actually exceeds 2<sup>97</sup>).
