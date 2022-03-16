# Median Sort

## Solution code

See [solution source code](/Qualification%20Round/Median%20Sort/solution.js)

## Analysis

You can see [solution analysis](/Qualification%20Round/Median%20Sort/analysis.md) extracted from Google webpage.

## Problem

You want to sort **N** distinct items, <code>x<sub>1</sub>,x<sub>2</sub>,…,x<sub>N</sub></code>. Unfortunately, you do not have a way of comparing two of these items. You only have a way to, given three of them, find out which one is the median, that is, which one is neither the minimum nor the maximum among the three.

For example, suppose **N**=5 and you know that:

- x<sub>1</sub> is the median of {x<sub>1</sub>,x<sub>2</sub>,x<sub>3</sub>}
- x<sub>2</sub> is the median of {x<sub>2</sub>,x<sub>3</sub>,x<sub>4</sub>}
- x<sub>3</sub> is the median of {x<sub>3</sub>,x<sub>4</sub>,x<sub>5</sub>}

Then, it is guaranteed that the sorted order of the elements is either x<sub>4</sub>,x<sub>2</sub>,x<sub>1</sub>,x<sub>3</sub>,x<sub>5</sub> or its reverse x<sub>5</sub>,x<sub>3</sub>,x<sub>1</sub>,x<sub>2</sub>,x<sub>4</sub>. Notice that by knowing only medians, it is impossible to distinguish the order of any list from its reverse, since the median question has the same result for any three elements in both cases.

Your program will have to find the order of **T** lists of **N** elements using at most **Q** median questions in total (or **Q**/**T** queries per list on average). In each case, finding either the right order or its reverse is considered correct. The order for each case is generated uniformly at random from all possible orders, and independently of any other information.

## Input and output

This is an interactive problem. You should make sure you have read the information in the Interactive Problems section of our [FAQ](https://codingcompetitions.withgoogle.com/codejam/faq).

Initially, the judge will send you a single line containing three integers **T**, **N**, and **Q**: the number of test cases, the number of elements to sort within each test case, and the total number of questions you are allowed across all test cases, respectively. Then, you must process **T** test cases. Each test case consists of a series of question exchanges plus an additional exchange to provide the answer.

For a question exchange, your program must print a single line containing three distinct integers `i`,`j`,`k` all between 1 and **N**, inclusive, which corresponds to asking the judge "which element is the median of the set {x<sub>i</sub>,x<sub>j</sub>,x<sub>k</sub>}?" The judge will respond with a single line containing a single integer **L**, meaning that the median of that set is x<sub>**L**</sub> (**L** is always equal to one of `i`, `j`, or `k`). If you try to perform a (**Q**+1)-th question exchange, the judge will simply output `-1`.

Once you are ready to state the result, print a line containing **N** integers representing the indices of the elements in sorted or reverse sorted order. The judge will respond with a single integer `1` if your answer is correct or `-1` if it is not. After receiving the judge's answer for the **T**-th case, your program must finish in time in order to not receive a Time Limit Exceeded error. In addition, if you print additional information after receiving the result for the **T**-th case, you will get a Wrong Answer judgment.

If the judge receives an invalidly formatted line or invalid values from your program at any moment, the judge will print a single number `-1`. After the judge prints `-1` for any of the reasons explained above, it will not print any further output. If your program continues to wait for the judge after receiving a `-1`, your program will time out, resulting in a Time Limit Exceeded error. Notice that it is your responsibility to have your program exit in time to receive a Wrong Answer judgment instead of a Time Limit Exceeded error. As usual, if the memory limit is exceeded, or your program gets a runtime error, you will receive the appropriate judgment.

## Limits

Time limit: 40 seconds.<br>
Memory limit: 1 GB.<br>
**T**=100.

## Test Set 1 (Visible Verdict)

**N**=10.<br>
**Q**=300⋅**T**.

## Test Set 2 (Visible Verdict)

**N**=50.<br>
**Q**=300⋅**T**.

## Test Set 3 (Hidden Verdict)

**N**=50.<br>
**Q**=170⋅**T**.

## Testing Tool

You can use this testing tool to test locally or on our platform. To test locally, you will need to run the tool in parallel with your code; you can use our [interactive runner](/Qualification%20Round/Median%20Sort/interactive_runner.py) for that. For more information, read the instructions in comments in that file, and also check out the [Interactive Problems section](https://codingcompetitions.withgoogle.com/codejam/faq#interactive-problems) of the FAQ.

Instructions for the testing tool are included in comments within the tool. We encourage you to add your own test cases. Please be advised that although the testing tool is intended to simulate the judging system, it is **NOT** the real judging system and might behave differently. If your code passes the testing tool but fails the real judge, please check the [Coding section](https://codingcompetitions.withgoogle.com/codejam/faq#coding) of the FAQ to make sure that you are using the same compiler as us.

[Download testing tool](/Qualification%20Round/Median%20Sort/local_testing_tool.py)

## Sample Interaction

| Judge                                                     | Constraints                                                                                  | Solution    |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ----------- |
| `2 5 600` <br>Judge provides **T**, **N**, **Q**          | **Case 1** <br>_Solution asks for the median of {x<sub>1</sub>,x<sub>2</sub>,x<sub>3</sub>}_ | `1 2 3`     |
| `2` <br>_Judge responds that the median is x<sub>2</sub>_ | Solution asks for the median of {x<sub>4</sub>,x<sub>2</sub>,x<sub>3</sub>}                  | `4 2 3`     |
| `3` <br>_Judge responds that the median is x<sub>3</sub>_ | Solution asks for the median of {x<sub>5</sub>,x<sub>4</sub>,x<sub>3</sub>}                  | `5 4 3`     |
| `4` <br>_Judge responds that the median is x<sub>4</sub>_ | Solution outputs the sorted list                                                             | `5 4 3 2 1` |
| `1` <br>_Judge confirms that the answer is correct_       |                                                                                              |             |
|                                                           | **Case 2** <br>_Solution asks for the median of {x<sub>1</sub>,x<sub>2</sub>,x<sub>3</sub>}_ | `1 2 3`     |
| `3` <br>_Judge responds that the median is x<sub>3</sub>_ | Solution asks for the median of {x<sub>2</sub>,x<sub>3</sub>,x<sub>4</sub>}                  | `2 3 4`     |
| `4` <br>_Judge responds that the median is x<sub>4</sub>_ | Solution asks for the median of {x<sub>3</sub>,x<sub>4</sub>,x<sub>5</sub>}                  | `3 4 5`     |
| `5` <br>_Judge responds that the median is x<sub>5</sub>_ | Solution outputs the sorted list                                                             | `1 3 5 4 2` |
| `1` <br>_Judge confirms that the answer is correct_       |                                                                                              |             |
