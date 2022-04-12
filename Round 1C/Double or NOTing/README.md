# Double or NOTing

## Solution code

See [solution source code](/Round%201C/Double%20or%20NOTing/solution.js)

## Analysis

You can see [solution analysis](/Round%201C/Double%20or%20NOTing/analysis.md) extracted from Google webpage.

## Problem

You are given a starting non-negative integer **S** and an ending non-negative integer **E**. Both **S** and E are given by their binary representation (that is, they are given written in base `2`). Your goal is to transform **S** into **E**. The following two operations are available to you:

- Double your current value.
- Take the bitwise `NOT` of your current value. The binary representation of your current value is taken without unnecessary leading zeroes, and any unnecessary leading zeroes produced by the operation are dropped. (The only necessary leading zero is the one in the representation of `0`).

For example, by using the double operation, `6` becomes `12`, `0` becomes `0`, and `10` becomes `20`. By using the `NOT` operation, `0` becomes `1`, `1` becomes `0`, <code>3=11<sub>2</sub></code> becomes `0`, <code>14=1110<sub>2</sub></code> becomes `1`, <code>10=1010<sub>2</sub></code> becomes <code>5=101<sub>2</sub></code>, and <code>5=101<sub>2</sub></code> becomes <code>2=10<sub>2</sub></code>. (<code>X</sub>2</sub></code> means the integer whose binary representation is `X`).

You can use these operations as many times as you want in any order. For example, you can transform <code>**S**=10001<sub>2</sub></code> to <code>**E**=111<sub>2</sub></code> using the `NOT` operation first, then using the double operation twice, and then another `NOT` operation:

![10001_2 \overset{\text{NOT}}{\Longrightarrow} 1110_2 \overset{\times 2}{\Longrightarrow} 11100_2 \overset{\times 2}{\Longrightarrow} 111000_2 \overset{\text{NOT}}{\Longrightarrow} 111_2.](https://render.githubusercontent.com/render/math?math=10001_2%20%5Coverset%7B%5Ctext%7BNOT%7D%7D%7B%5CLongrightarrow%7D%201110_2%20%5Coverset%7B%5Ctimes%202%7D%7B%5CLongrightarrow%7D%2011100_2%20%5Coverset%7B%5Ctimes%202%7D%7B%5CLongrightarrow%7D%20111000_2%20%5Coverset%7B%5Ctext%7BNOT%7D%7D%7B%5CLongrightarrow%7D%20111_2.)

Determine the smallest number of operations needed to complete the transformation, or say it is impossible to do so.

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow. Each consists of a single line containing two strings **S** and **E**, the binary representations of the starting and ending integers, respectively.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and `y` is `IMPOSSIBLE` if there is no way to transform **S** into **E** using the two operations. Otherwise, `y` is the smallest number of operations needed to transform **S** into **E**.

## Limits

Time limit: 10 seconds.<br>
Memory limit: 1 GB.<br>
1≤**T**≤100.<br>
Each character of **S** is either `0` or `1`.<br>
The first digit of **S** can be `0` only if the length of **S** is `1`.<br>
Each character of **E** is either `0` or `1`.<br>
The first digit of **E** can be `0` only if the length of **E** is `1`.

## Test Set 1 (Visible Verdict)

1≤ the length of **S**≤8.<br>
1≤ the length of **E**≤8.

## Test Set 2 (Hidden Verdict)

1≤ the length of **S**≤100.<br>
1≤ the length of **E**≤100.

## Sample

| Input           | Output              |
| --------------- | ------------------- |
| 6               |                     |
| 10001 111       | Case #1: 4          |
| 1011 111        | Case #2: 3          |
| 1010 1011       | Case #3: 2          |
| 0 1             | Case #4: 1          |
| 0 101           | Case #5: IMPOSSIBLE |
| 1101011 1101011 | Case #6: 0          |

Sample Case #1 is the example shown in the main part of the statement.

These are possible optimal ways of solving Sample Cases #2, #3, and #4, respectively:

![1011_2 \overset{\text{NOT}}{\Longrightarrow} 100_2 \overset{\times 2}{\Longrightarrow} 1000_2 \overset{\text{NOT}}{\Longrightarrow} 111_2,](https://render.githubusercontent.com/render/math?math=1011_2%20%5Coverset%7B%5Ctext%7BNOT%7D%7D%7B%5CLongrightarrow%7D%20100_2%20%5Coverset%7B%5Ctimes%202%7D%7B%5CLongrightarrow%7D%201000_2%20%5Coverset%7B%5Ctext%7BNOT%7D%7D%7B%5CLongrightarrow%7D%20111_2%2C)

![1010_2 \overset{\times 2}{\Longrightarrow} 10100_2 \overset{\text{NOT}}{\Longrightarrow} 1011_2, \text{ and}](https://render.githubusercontent.com/render/math?math=1010_2%20%5Coverset%7B%5Ctimes%202%7D%7B%5CLongrightarrow%7D%2010100_2%20%5Coverset%7B%5Ctext%7BNOT%7D%7D%7B%5CLongrightarrow%7D%201011_2%2C%20%5Ctext%7B%20and%7D)

![0_2 \overset{\text{NOT}}{\Longrightarrow} 1_2.](https://render.githubusercontent.com/render/math?math=0_2%20%5Coverset%7B%5Ctext%7BNOT%7D%7D%7B%5CLongrightarrow%7D%201_2.)

In Sample Case #5, it is not possible to get from <code>0<sub>2</sub></code> to <code>101<sub>2</sub></code> with any sequence of operations.

In Sample Case #6, we do not need to perform any operations because **S**=**E**.
