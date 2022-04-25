# Hidden Pancakes

## Solution code

See [solution source code c++](/Round%202/Hidden%20Pancakes/solution.cpp)
See [solution source code js](/Round%202/Hidden%20Pancakes/solution.js)

## Analysis

You can see [solution analysis](/Round%202/Hidden%20Pancakes/analysis.md) extracted from Google webpage.

## Problem

We are cooking **N** pancakes in total. We cook one pancake with a `1` centimeter (cm) radius, one with a `2` cm radius, one with a `3` cm radius, ..., and one with an **N** cm radius, not necessarily in that order. After we cook the first pancake, we just lay it on a plate. After we cook each subsequent pancake, we lay it on top of the previously made pancake, with their centers coinciding. In this way, a pancake is visible from the top of the stack when we first add it. A pancake only becomes hidden if we later cook another pancake with a larger radius.

For example, say we cook `4` pancakes. We first cook the pancake with radius `3` cm, and it is visible. Then, we cook the pancake with radius `1` cm, lay it on top of the first one and both are visible. Third, we cook the pancake with radius `2` cm, and now that covers the previous pancake, but not the first one, so `2` pancakes remain visible in total. Finally, we cook the pancake with radius `4` cm which covers the other pancakes leaving only `1` visible pancake. The picture below illustrates the state of the stack after each pancake is cooked. Within each stack, the fully colored pancakes are visible and the semi-transparent pancakes are not visible.

![Hidden Pancakes](/images/round-2-hidden-pancakes.png)

Let **V<sub>i</sub>** be the number of visible pancakes when the stack contains exactly i pancakes. In the example above, **V<sub>1</sub>**=1, **V<sub>2</sub>**=2, **V<sub>3</sub>**=2, and **V<sub>4</sub>**=1.

Given the list **V<sub>1</sub>**,**V<sub>2</sub>**,…,**V<sub>N</sub>**, how many of the **N!** possible cooking orders yield those values? Since the output can be a really big number, we only ask you to output the remainder of dividing the result by the prime 10<sup>9</sup>+7 (1000000007).

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow, each described with two lines. The first line of a test case contains a single integer **N**, the number of pancakes we cook. The second line of a test case contains **N** integers **V<sub>1</sub>**, **V<sub>2</sub>**, ..., **V<sub>N</sub>**, representing the number of visible pancakes after we cook 1, 2, ..., **N** pancakes, respectively.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and `y` is the number of cooking orders of N pancakes that yield the given numbers of visible pancakes after each step, modulo the prime 10<sup>9</sup>+7 (1000000007).

## Limits

Memory limit: 1 GB.<br>
1≤**T**≤100.<br>
1≤**V<sub>i</sub>**≤*i*, for all i.

## Test Set 1 (Visible Verdict)

Time limit: 30 seconds.<br>
2≤**N**≤13.

## Test Set 2 (Hidden Verdict)

Time limit: 40 seconds.<br>
2≤**N**≤10<sup>5</sup>.

## Sample

_Note: there are additional samples that are not run on submissions down below._

| Input   | Output     |
| ------- | ---------- |
| 3       |            |
| 4       | Case #1: 1 |
| 1 2 2 1 |            |
| 3       | Case #2: 2 |
| 1 1 2   |            |
| 3       | Case #3: 0 |
| 1 1 3   |            |

Sample Case #1 is explained in the problem statement. The order `3,1,2,4` is the only one that yields the given **V<sub>i</sub>**s.

In Sample Case #2, both the order `1,3,2` and the order `2,3,1` yield the intended **V<sub>i</sub>**s. The pictures below illustrate both options.

![Hidden pancakes](/images/round-2-hidden-pancakes-2.png)
![Hidden pancakes](/images/round-2-hidden-pancakes-3.png)

In Sample Case #3, only 1 pancake is visible after the second is made, so there is no way to have more than 2 visible pancakes by only adding a third.

## Additional Sample - Test Set 2

_The following additional sample fits the limits of Test Set 2. It will not be run against your submitted solutions._

| Input                                           | Output             |
| ----------------------------------------------- | ------------------ |
| 1                                               |                    |
| 24                                              | Case #1: 234141013 |
| 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 |                    |

In the Sample Case for Test Set 2, there are `316234143225` cooking orders that yield the given Vis. Modulo 10<sup>9</sup>+7, this value is `234141013`.
