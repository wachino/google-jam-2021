# Subtransmutation

## Solution code

See [solution source code](/Round%201B/Subtransmutation/solution.js)

## Analysis

You can see [solution analysis](/Round%201B/Subtransmutation/analysis.md) extracted from Google webpage.

## Problem

As the most skilled alchemist in your country, you were summoned yet again because powers beyond science were needed to satisfy your country's leader's ever increasing greed for rare metals.

Each metal is represented by a positive integer. You need to create **U<sub>1</sub>** units of metal 1, **U<sub>2</sub>** units of metal <code>2, … and **U<sub>N</sub>**</code> units of metal **N**. Metals **N**+1,**N**+2,… do exist, but you are not required to create any specific amount of them. You are allowed to create excess amounts of any metal, which can just be discarded.

Unfortunately, budget cuts have left you only the materials for a simple alchemy spell. For some fixed numbers **A** and **B**, with **A**<**B**, you can take one unit of metal i and destroy it to create one unit of metal (i−**A**) and one unit of metal (i−**B**). If either of those integers is not positive, that specific unit is not created. In particular, if i≤A, the spell simply destroys the unit and creates nothing. If <code>**A** < i ≤ **B**</code> the spell destroys the unit and creates only a single unit of metal (i−**A**).

You have been assigned an expert miner to assist you. The expert miner can fetch a single unit of any metal you want. From that unit, you can use your spell to create other metals and then use the spell on the resulting metals to create even more units. The picture below shows a single unit of metal `4` being converted into one unit of metal `1` and two units of metal `2` using two spells with **A**=1 and **B**=2.

![Subtransmutation](/images/round-1b-subtransmutation-1.png)

Metals represented by larger integers are heavier and more difficult to handle, so you want to ask the expert miner for a single unit of metal represented by the smallest possible integer that is sufficient to complete your task, or say that there is no such metal.

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow. Each test case consists of two lines. The first line of a test case contains three integers **N**, **A**, and **B**, representing the largest metal number that you are required to create, and the two values that define the available spell as described above, respectively. The second line of a test case contains N integers **U<sub>1</sub>**,**U<sub>2</sub>**,…,**U<sub>N</sub>**, representing the required units of metals 1,2,…,**N**, respectively.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and `y` is `IMPOSSIBLE` if it is not possible to create all required units starting from a single unit of metal. Otherwise, `y` is the smallest integer that represents a metal such that one unit of it is sufficient to create all the required units of metal.

## Limits

Time limit: 30 seconds.<br>
Memory limit: 1 GB.<br>
1≤**T**≤100.<br>
1≤**N**≤20.<br>
0≤**U<sub>i</sub>**≤20, for all i.<br>
1≤**U<sub>N</sub>**.<br>
**2≤U<sub>1</sub>**+**U<sub>2</sub>**+⋯+**U<sub>N</sub>**.

## Test Set 1 (Visible Verdict)

**A**=1.<br>
**B**=2.

## Test Set 2 (Hidden Verdict)

1≤**A**<**B**≤20.

## Sample

_Note: there are additional samples that are not run on submissions down below._

| Input     | Output     |
| --------- | ---------- |
| 3         |            |
| 2 1 2     | Case #1: 4 |
| 1 2       |            |
| 5 1 2     | Case #2: 6 |
| 2 0 0 0 1 |            |
| 3 1 2     | Case #3: 5 |
| 1 1 1     |            |

In Sample Case #1, we require one unit of metal `1` and two units of metal `2`. If we start with a single unit of metal `3`, then applying the spell once will give us one unit of metal `1` and one unit of metal `2`. There is no way to get an additional unit of metal `2`. Similarly, starting with a single unit of metals `1` or `2` is not sufficient. However, a single unit of metal `4` is sufficient as is demonstrated in the picture in the main part of the statement.

In Sample Case #2, we can start with a single unit of metal 6 and apply the following operations:

- Apply spell on 6: `{6}⟶{4,5}`.
- Apply spell on 4: `{4,5}⟶{2,3,5}`.
- Apply spell on 2: `{2,3,5}⟶{1,3,5}`.
- Apply spell on 3: `{1,3,5}⟶{1,1,2,5}`.

Note that even though we have an extra unit of metal 2, this solution is valid.

In Sample Case #3, we can start with a single unit of metal 5 and apply the following operations:

- Apply spell on 5: `{5}⟶{3,4}`.
- Apply spell on 4: `{3,4}⟶{2,3,3}`.
- Apply spell on 2: `{2,3,3}⟶{1,3,3}`.
- Apply spell on 3: `{1,3,3}⟶{1,1,2,3}`.

There are other ways to apply spells which also work but they all require starting with a single unit of metal 5 or higher.

## Additional Sample - Test Set 2

_The following additional sample fits the limits of Test Set 2. It will not be run against your submitted solutions._

| Input     | Output              |
| --------- | ------------------- |
| 3         |                     |
| 3 2 4     | Case #1: IMPOSSIBLE |
| 1 1 1     |                     |
| 3 2 4     | Case #2: 5          |
| 1 0 1     |                     |
| 5 2 5     | Case #3: 10         |
| 1 0 0 0 1 |                     |

In the first Sample Case for Test Set 2, it is impossible to start with a single unit of any metal and apply the spell with **A**=2 and **B**=4 several times and be left with one unit of metals `1`, `2`, and `3`.
