# Matrygons

## Solution code

See [solution source code](/Round%202/Matrygons/solution.js)

## Analysis

You can see [solution analysis](/Round%202/Matrygons/analysis.md) extracted from Google webpage.

## Problem

A [matryoshka](https://en.wikipedia.org/wiki/Matryoshka_doll) is a type of doll that originated in Russia over a century ago. Their defining characteristic is that they consist of a set of dolls, all of a different size, with smaller dolls fitting nicely inside larger dolls.

In this problem, we work with matrygons, which are sets of [regular convex polygons](https://en.wikipedia.org/wiki/Regular_polygon#Regular_convex_polygons) that follow a similar nesting pattern. A matrygon consists of a set of regular convex polygons with positive area <code>p<sub>1</sub>,p<sub>2</sub>,…,p<sub>k</sub></code> such that, for all i, the vertices of <code>p<sub>i+1</sub></code> overlap with a proper subset of the vertices of <code>p<sub>i</sub></code> (<code>p<sub>i+1</sub></code> has strictly less vertices than <code>p<sub>i</sub></code>).

For example, the following pictures illustrates two matrygons. The first one contains 3 regular convex polygons: a regular icositetragon (24 sides), a regular hexagon (6 sides), and an equilateral triangle (3 sides). The second one contains 2 regular convex polygons: a regular icosidigon (22 sides) and a regular hendecagon (11 sides). Each of these matrygons has 33 total sides among all polygons in it.

![Matrygons](/images/round-2-matrygons.png)
![Matrygons](/images/round-2-matrygons-2.png)

Given a fixed total number of sides **N**, calculate the largest number of polygons that can be part of a matrygon such that the total number of sides among all polygons in it is exactly **N**.

## Input

The first line of the input gives the number of test cases, **T**. **T** lines follow. Each line represents a test case and contains a single integer **N**, the target total number of sides.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and `y` is the maximum number of polygons in a matrygon such that the total number of sides among all polygons in it is exactly **N**.

## Limits

Memory limit: 1 GB.<br>
1≤**T**≤100.

## Test Set 1 (Visible Verdict)

Time limit: 20 seconds.<br>
3≤**N**≤1000.

## Test Set 2 (Visible Verdict)

Time limit: 40 seconds.<br>
3≤**N**≤10<sup>6</sup>.

## Sample

| Input | Output     |
| ----- | ---------- |
| 3     |            |
| 33    | Case #1: 3 |
| 15    | Case #2: 2 |
| 41    | Case #3: 1 |

The first matrygon pictured in the problem statement is an optimal solution for Sample Case #1.

In Sample Case #2, we can get to two polygons by fitting a regular pentagon (5 sides) inside a regular decagon (10 sides).

In Sample Case #3, there is no way to create a matrygon with multiple regular polygons, so our only option is to use a single regular tetracontahenagon (41 sides).
