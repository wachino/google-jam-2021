# Moons and Umbrellas

## Solution code

See [solution source code](/Qualification%20Round/Moons%20and%20Umbrellas/solution.js)

## Analysis

You can see [solution analysis](/Qualification%20Round/Moons%20and%20Umbrellas/analysis.md) extracted from Google webpage.

## Problem

Cody-Jamal is working on his latest piece of abstract art: a mural consisting of a row of waning moons and closed umbrellas. Unfortunately, greedy copyright trolls are claiming that waning moons look like an uppercase C and closed umbrellas look like a J, and they have a copyright on CJ and JC. Therefore, for each time CJ appears in the mural, Cody-Jamal must pay **X**, and for each time JC appears in the mural, he must pay **Y**.

![Moons and Umbrellas](/images/qualification-round-moons-and-umbrellas.png)

Cody-Jamal is unwilling to let them compromise his art, so he will not change anything already painted. He decided, however, that the empty spaces he still has could be filled strategically, to minimize the copyright expenses.

For example, if `CJ?CC?` represents the current state of the mural, with `C` representing a waning moon, `J` representing a closed umbrella, and `?` representing a space that still needs to be painted with either a waning moon or a closed umbrella, he could finish the mural as `CJCCCC`, `CJCCCJ`, `CJJCCC`, or `CJJCCJ`. The first and third options would require paying **X**+**Y** in copyrights, while the second and fourth would require paying `2⋅X+Y`.

Given the costs **X** and **Y** and a string representing the current state of the mural, how much does Cody-Jamal need to pay in copyrights if he finishes his mural in a way that minimizes that cost?

## Input

The first line of the input gives the number of test cases, **T**. **T** lines follow. Each line contains two integers **X** and **Y** and a string **S** representing the two costs and the current state of the mural, respectively.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and `y` is the minimum cost that Cody-Jamal needs to pay in copyrights for a finished mural.

## Limits

Time limit: 10 seconds.<br>
Memory limit: 1 GB.<br>
1≤**T**≤100.<br>
Each character of **S** is either `C`, `J`, or `?`.

## Test Set 1 (Visible Verdict)

1≤ the length of **S** ≤10.<br>
1≤**X**≤100.<br>
1≤**Y**≤100.

## Test Set 2 (Visible Verdict)

1≤ the length of **S** ≤1000.<br>
1≤**X**≤100.<br>
1≤**Y**≤100.

## Extra credit!

What if some copyright holders could pay Cody-Jamal for the advertisement instead of being paid? Cody-Jamal getting paid is represented by a negative cost.

## Test Set 3 (Hidden Verdict)

1≤ the length of **S** ≤1000.<br>
−100≤**X**≤100.<br>
−100≤**Y**≤100.

## Sample

_Note: there are additional samples that are not run on submissions down below._

| Input      | Output      |
| ---------- | ----------- |
| 4          |             |
| 2 3 CJ?CC? | Case #1: 5  |
| 4 2 CJCJ   | Case #2: 10 |
| 1 3 C?J    | Case #3: 1  |
| 2 5 ??J??? | Case #4: 0  |

Sample Case #1 is the one explained in the problem statement. The minimum cost is **X**+**Y**=2+3=5.

In Sample Case #2, Cody-Jamal is already finished, so he does not have a choice. There are two `CJs` and one `JC` in his mural.

In Sample Case #3, substituting either `C` or `J` results in one `CJ` either from the second and third characters or the first and second characters, respectively.

In Sample Case #4, Cody-Jamal can finish his mural with all `Js`. Since that contains no instance of `CJ` nor `JC`, it yields no copyright cost.

## Additional Sample - Test Set 3

_The following additional sample fits the limits of Test Set 3. It will not be run against your submitted solutions._

## Sample Input

| Input       | Output      |
| ----------- | ----------- |
| 1           |             |
| 2 -5 ??JJ?? | Case #1: -8 |

In Sample Case #1 for Test Set 3, Cody-Jamal can finish his mural optimally as `JCJJCC` or `JCJJJC`. Either way, there is one `CJ` and two `JCs` in his mural.
