# Roaring Years

## Solution code

See [solution source code](/Round%201C/Roaring%20Years/solution.js)

## Analysis

You can see [solution analysis](/Round%201C/Roaring%20Years/analysis.md) extracted from Google webpage.

## Problem

Something is happening in `2021` that has not happened in over a century. `2021`, like `1920` before it, is a roaring year. A year represented by a positive integer `y` is roaring if the decimal writing (without leading zeroes) of `y` is the concatenation of the decimal writing (without leading zeroes) of two or more distinct consecutive positive integers, in increasing order. In this case, `2021` is a roaring year because it is the concatenation of `20` and `21`.

![Roaring years](/images/round-1c-roaring-years-1.png)
_Three calendars from roaring years, marked to show how roaring their years are._

Other examples of roaring years are `12, 789, 910, 1234`, and `9899100`. `2020` was not roaring because the only list of two or more positive integers that concatenate into `2020` is `[20,20]`, and it is not made of consecutive integers. Similarly, there are only three lists for `2019`: `[20,1,9]`, `[201,9]`, and `[20,19]`. The first two are not made of consecutive integers, while the third does not have the integers in increasing order. Thus, `2019` was also not roaring. As a final example, `778` was not a roaring year because `[7,78]` and `[77,8]` are not made up of consecutive integers and `[7,7,8]` is not made up of distinct integers.

Given the current year (which may or may not be roaring), find what the next roaring year is going to be.

## Input

The first line of the input gives the number of test cases, **T**. **T** lines follow. Each line represents a test case and contains a single integer **Y**, the current year.

## Output

For each test case, output one line containing `Case #x: z`, where `x` is the test case number (starting from 1) and `z` is the first year strictly after **Y** that is roaring.

## Limits

Time limit: 30 seconds.<br>
Memory limit: 1 GB.<br>
1≤**T**≤100.

## Test Set 1 (Visible Verdict)

1≤**Y**≤10<sup>6</sup>.

## Test Set 2 (Hidden Verdict)

1≤**Y**≤10<sup>18</sup>.

## Sample

| Input | Output         |
| ----- | -------------- |
| 4     |                |
| 2020  | Case #1: 2021  |
| 2021  | Case #2: 2122  |
| 68000 | Case #3: 78910 |
| 101   | Case #4: 123   |

Notice in the last Sample Case that `102` is not a roaring year because `[10,2]` is not a list of consecutive integers and you cannot write `2` with a leading zero to use `[1,02]`.
