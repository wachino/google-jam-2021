# Prime Time

## Solution code

See [solution source code](/Round%201A/Prime%20Time/solution.js)

## Analysis

You can see [solution analysis](/Round%201A/Prime%20Time/analysis.md) extracted from Google webpage.

## Problem

You are playing a new solitaire game called Prime Time. You are given a deck of cards, and each card has a prime number written on it. Multiple cards may have the same number.

Your goal is to divide the cards into two groups in such a way that the sum of the numbers in the first group is equal to the product of the numbers in the second group. Each card must belong to exactly one of the two groups, and each group must contain at least one card. The sum or product of a group that consists of a single card is simply the number on that card.

![Prime Time Example](/images/round-a-prime-time.png)

For example, in the image above, the left group has cards whose sum is `25` and the right group has cards whose product is `25`. Therefore, this is a valid split into groups.

Your score is the sum of the numbers in the first group (which is equal to the product of the numbers in the second group), or 0 if you cannot split the cards this way at all. What is the maximum score you can achieve?

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow. The first line of each test case contains a single integer **M**, representing the number of distinct prime numbers in your deck. Each of the next **M** lines contains two values: **P<sub>i</sub>** and **N<sub>i</sub>**, representing that you have exactly **N<sub>i</sub>** cards with the prime **P<sub>i</sub>** written on them.

Note that the total number of cards in your deck is the sum of all **N<sub>i</sub>**`s`.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from `1`) and `y` is the maximum score you can achieve.

## Limits

Time limit: 45 seconds.<br>
Memory limit: 1 GB.<br>
1≤**T**≤100.<br>
1≤**M**≤95. (Note that there are exactly 95 distinct primes between 2 and 499)<br>
2≤ **P<sub>i</sub>** ≤499, for all `i`.<br>
Each **P<sub>i</sub>** is prime.<br>
<code>P<sub>i</sub>\<P<sub>i+1</sub></code>, for all `i`. (The primes are given in strictly increasing order)<br>
1≤**N<sub>i</sub>**, for all `i`.<br>

## Test Set 1 (Visible Verdict)

2≤ **N<sub>1</sub>+N<sub>2</sub>+⋯+N<sub>M</sub>** ≤10.

## Test Set 2 (Visible Verdict)

2≤ **N<sub>1</sub>+N<sub>2</sub>+⋯+N<sub>M</sub>** ≤100.

## Test Set 3 (Hidden Verdict)

2≤ **N<sub>1</sub>+N<sub>2</sub>+⋯+N<sub>M</sub>** ≤10<sup>15</sup>.

## Sample

| Input | Output      |
| ----- | ----------- |
| 4     |             |
| 5     | Case #1: 25 |
| 2 2   |             |
| 3 1   |             |
| 5 2   |             |
| 7 1   |             |
| 11 1  |             |
| 1     | Case #2: 17 |
| 17 2  |             |
| 2     | Case #3: 0  |
| 2 2   |             |
| 3 1   |             |
| 1     | Case #4: 8  |
| 2 7   |             |

In Sample Case #1, the optimal split is: `11+2+7+3+2=5⋅5`. Another split is also possible: `5+7+3+2+5=11⋅2`, but it gives a lower score.

In Sample Case #2, note that cards with the same number can be placed in different groups.
