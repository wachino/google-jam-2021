# Closest Pick

## Solution code

See [solution source code](/Round%201C/Closest%20Pick/solution.js)

## Analysis

You can see [solution analysis](/Round%201C/Closest%20Pick/analysis.md) extracted from Google webpage.

## Problem

You are entering a raffle for a lifetime supply of pancakes. **N** tickets have already been sold. Each ticket contains a single integer between `1` and **K**, inclusive. Different tickets are allowed to contain the same integer. You know exactly which numbers are on all of the tickets already sold and would like to maximize your odds of winning by purchasing two tickets (possibly with the same integer on them). You are allowed to choose which integers between `1` and **K**, inclusive, are on the two tickets.

![Closest Pick](/images/round-1c-closest-pick-1.png)

You know you are the last customer, so after you purchase your tickets, no more tickets will be purchased. Then, an integer `c` between 1 and **K**, inclusive, is chosen uniformly at random. If one of your tickets is strictly closer to `c` than all other tickets or if both of your tickets are the same distance to `c` and strictly closer than all other tickets, then you win the raffle. Otherwise, you do not win the raffle.

Given the integers on the **N** tickets purchased so far, what is the maximum probability of winning the raffle you can achieve by choosing the integers on your two tickets optimally?

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow. Each test case consists of two lines. The first line of a test case contains two integers **N** and **K**: the number of tickets already sold and the limit of the range of integers to pick from, respectively. The second line contains **N** integers **P<sub>1</sub>**,**P<sub>2</sub>**,…,**P<sub>N</sub>**, representing the integers on the tickets that have already been purchased.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and `y` is the maximum win probability you can achieve if you choose your tickets optimally.

`y` will be considered correct if it is within an absolute or relative error of 10<sup>−6</sup> of the correct answer. See the [FAQ](https://codingcompetitions.withgoogle.com/codejam/faq#competing) for an explanation of what that means, and what formats of real numbers we accept.

## Limits

Time limit: 10 seconds.<br>
Memory limit: 1 GB.<br>
1≤**T**≤100.<br>
1≤**N**≤30.<br>
1≤**P<sub>i</sub>**≤**K**, for all i.

## Test Set 1 (Visible Verdict)

1≤**K**≤30

## Test Set 2 (Visible Verdict)

1≤**K**≤10<sup>9</sup>.

## Sample

| Input   | Output        |
| ------- | ------------- |
| 4       |               |
| 3 10    | Case #1: 0.5  |
| 1 3 7   |               |
| 4 10    | Case #2: 0.4  |
| 4 1 7 3 |               |
| 4 3     | Case #3: 0.0  |
| 1 2 3 2 |               |
| 4 4     | Case #4: 0.25 |
| 1 2 4 2 |               |

In Sample Case #1, you can purchase tickets with the integers `4` and `8` on them and then win if `4,5,8,9`, or `10` are chosen giving you `5/10=0.5` probability of winning. Purchasing tickets with the integers `6` and `8` on them also yields a `0.5` probability of winning, but no combination yields more.

In Sample Case #2, `6` and `8` is a possible optimal pair of tickets, which wins when `c` is one of `6,8,9`, or `10`. Note that the integers on the tickets are not necessarily given in sorted order.

In Sample Case #3, every possible `c` is at distance `0` from an already purchased ticket, so you cannot win regardless of your choices.

In Sample Case #4, if you pick `3` for at least one of your tickets, you win on `c=3`, for `1/4=0.25` win probability. There is no way to win when `c` is any other integer, so that is the best you can do.
