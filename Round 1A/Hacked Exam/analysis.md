# Analysis

## Test Set 1

In this problem we want to maximize our expected score. Let p<sub>q</sub> be the probability of question `q`'s answer being `T`, and let **Q<sub>T</sub>** and **Q<sub>F</sub>** be the sets of questions we answer with `T` and `F`, respectively. By [linearity of expectation](https://en.wikipedia.org/wiki/Expected_value#Basic_properties), the expected score to maximize can be written as

![\left(\sum_{q \in Q_\mathtt{T}} p_q \right) + \sum_{q \in Q_\mathtt{F}} \left(1 - p_q \right).](https://render.githubusercontent.com/render/math?math=%5Cleft%28%5Csum_%7Bq%20%5Cin%20Q_%5Cmathtt%7BT%7D%7D%20p_q%20%5Cright%29%20%2B%0A%20%20%20%20%5Csum_%7Bq%20%5Cin%20Q_%5Cmathtt%7BF%7D%7D%20%5Cleft%281%20-%20p_q%20%5Cright%29.)

Notice that linearity of expectation can be used regardless of any conditional probability between different questions. In this case, those conditional probabilities can be quite complicated, so being able to ignore them and treat each question independently despite them not being [independent in the probability theory sense](<https://en.wikipedia.org/wiki/Independence_(probability_theory)>) simplifies the solution process significantly. This is a trick that is important in many problems about expected values.

We operate with fractions throughout most of the proposed solutions. As noted in the sample, the needed numbers may exceed 64 bits for Test Set 3, and potentially for Test Set 2 as well, depending on the exact implementation of the algorithm and the fraction operations. It is absolutely possible to solve Test Set 2 with simply 64-bit integers and Test Set 3 with just 128-bit integers. Our most popular languages all support this in some way: C and C++ have `__int128` support, Java and C# have `BigInteger`, JavaScript has `BigInt`, Bash has `bc`, and Python, Ruby and Haskell have native long integer support. We usually strive to make most of our problems solvable with just 64-bit integer arithmetic, but in this case, limiting the number of questions so much would allow suboptimal solutions in fast languages to pass Test Set 3.

Notice that we can have information of 1 or 2 other students in the first two test sets, and also 3 in the last test set. We could solve each number of students independently, but there is no need for that. Adding a student with the same answers and score as a student in the input results in a completely equivalent case, so we can always assume that there are a maximum number of students by copying any student the needed number of times.

## Test Set 1

In Test Set 1, the number of questions **Q** is small enough that we can simply enumerate all possible 2<sup>**Q**</sup> sequences of answers, and filter out those who are inconsistent with the input (i.e., those for which one of the students would obtain a different score than they actually got). From the consistent ones, we can estimate the <code>p<sub>q</sub>s</code> above as the ratio between the number of sequences that answer `T` to question `q`, over the total. Then, we can simply choose to answer `T` to those questions with <code>p<sub>q</sub>>1/2</code> and `F` to those with <code>p<sub>q</sub><1/2</code>. We can answer the questions with <code>p<sub>q</sub>=1/2</code> either way.

## Test Set 2

In Test Set 2 **Q** is large, so we cannot enumerate the sequences of answers. We can, on the other hand, figure out the probabilities <code>p<sub>q</sub></code> in a different way, and then proceed as before with choosing the answers by comparing those values to `1/2`.

## An insight-based solution

One way to solve Test Set 2 is by splitting the questions into types. If two questions <code>q<sub>1</sub></code> and <code>q<sub>2</sub></code> received the same answer from each student, then by symmetry <code>p<sub>q<sub>1</sub></sub>=p<sub>q<sub>2</sub></sub></code>. Then, let <code>p<sub>ab</sub></code> be equal to the probability of a question's answer being `T` given that the first student answered `a` and the second student answered b to it. By the first observation, each <code>p<sub>q</sub></code> is equal to one of the 4 values <code>p<sub>TT</sub></code>, <code>p<sub>TF</sub></code>, <code>p<sub>FT</sub></code> or <code>p<sub>FF</sub></code>. Moreover, by the symmetry of complementing answers, <code>p<sub>TT</sub>=1−p<sub>FF</sub></code> and <code>p<sub>TF</sub>=1−p<sub>FT</sub></code>. Therefore, we can express every <code>p<sub>q</sub></code> as a linear function of up to two variables <code>p<sub>TT</sub></code> and <code>p<sub>TF</sub></code>. That means we can express the expected score of both students as linear functions on those two variables too. Given that their expected score should match their actual score, that gives us two equations with two unknowns. We can derive the real values of <code>p<sub>TT</sub></code> and <code>p<sub>TF</sub></code> from that system of equations. With every <code>p<sub>q</sub></code> calculated, we can simply choose, for each question, an answer that has maximum probability, as in the solution for Test Set 1.

Notice that there are `4` possible cases depending on how our two variables compare with `1/2` (if one is exactly `1/2` that means two cases are equivalent and if both are `1/2` then all cases are equivalent). The `4` cases exactly match with either answering the same as one of the students, or answering the opposite of one of the students. We can use this observation to greatly simplify the implementation as the score of a sequence given by a student is given to us, and the score of the complement of the answers of student `i` is **Q−S<sub>i</sub>**, so we can easily obtain the scores of the `4` options and pick a highest one.

## A more competitive-programming-standard solution

In case of having 2 students, we can use [dynamic programming](https://en.wikipedia.org/wiki/Dynamic_programming) to calculate the probability of each question having a particular answer. We compute the recursive function f(s<sub>1</sub>,s<sub>2</sub>,q) defined as "how many ways are there to answer questions `q,q+1,q+2,…,Q` such that student `1` gets exactly s<sub>1</sub> of them right and student `2` gets exactly s<sub>2</sub> of them right?" We can define that function recursively as

![f(s_1, s_2, q) = f(s_1 - I_1(q, \mathtt{T}), s_2 - I_2(q, \mathtt{T}), q+1) + f(s_1 - I_1(q, \mathtt{F}), s_2 - I_2(q, \mathtt{F}), q+1)](https://render.githubusercontent.com/render/math?math=f%28s_1%2C%20s_2%2C%20q%29%20%3D%20f%28s_1%20-%20I_1%28q%2C%20%5Cmathtt%7BT%7D%29%2C%20s_2%20-%20I_2%28q%2C%20%5Cmathtt%7BT%7D%29%2C%20q%2B1%29%20%2B%20f%28s_1%20-%20I_1%28q%2C%20%5Cmathtt%7BF%7D%29%2C%20s_2%20-%20I_2%28q%2C%20%5Cmathtt%7BF%7D%29%2C%20q%2B1%29)

where I<sub>i</sub>(q,c) is `1` if student `i` answered `c` to question `q` and `0` otherwise. The base cases are `f(0,0,Q+1)=1` and <code>f(s<sub>1</sub>,s<sub>2</sub>,Q+1)=0</code> whenever one of s<sub>1</sub> or s<sub>2</sub> is not 0. To simplify memoization, we may want to add a case to simply answer 0 whenever s<sub>1</sub> or s<sub>2</sub> are negative, but the recursive equation holds as written for those cases.

By memoizing that function, we can compute it in time O(**Q<sup>3</sup>**). We can calculate the probability of question 1's answer being **T** as

![\frac{f(\mathbf{S_1} - I_1(1, \mathtt{T}), \mathbf{S_2} - I_2(1, \mathtt{T}), 2)}{f(\mathbf{S_1}, \mathbf{S_2}, 1)}.](https://render.githubusercontent.com/render/math?math=%5Cfrac%7Bf%28%5Cmathbf%7BS_1%7D%20-%20I_1%281%2C%20%5Cmathtt%7BT%7D%29%2C%20%5Cmathbf%7BS_2%7D%20-%20I_2%281%2C%20%5Cmathtt%7BT%7D%29%2C%202%29%7D%0A%20%20%20%20%20%20%20%20%20%7Bf%28%5Cmathbf%7BS_1%7D%2C%20%5Cmathbf%7BS_2%7D%2C%201%29%7D.)

Then, by symmetry, we can reorder the questions to make any question the first one and re-run to compute the probability for any question. After having all probabilities, we simply answer the most likely answer for each question and sum its probability to our expected score. Since we need to run the probability computation O(**Q**) times (once per question), the overall algorithm takes O(**Q<sup>4</sup>**) time. This can be a little too slow.

If we add only the first observation of the insight-based solution, we can notice that two questions that were answered the same by both students have identical probabilities. Then, we only need to calculate the probability of up to 4 question types (in the notation of the previous solution, we use dynamic programming to calculate all the p<sub>ab</sub>s). This improves the overall running time to O(Q<sup>3</sup>), which fits better within the time limit. An observation about complement could further reduce this to only `2` question types, but that does not change the time complexity and it is not needed to pass this test set.

## Test Set 3

The dynamic programming solution for Test Set 2 can be generalized to Test Set 3 by adding an additional score as another parameter to the recursive function. However, the additional dimension and larger limit for **Q** can easily make such solutions too slow.

Combining the full insights of the first solution to Test Set 2 with the solution to Test Set 1 works, though: there are `8` probability variables p<sub>abc</sub>, and pairs of complementary variables have complementary probabilities, so we only care about `4` different ones.

Let us call the subindex of the variables (the `abc` part) the "type" of a question. Let us number the types `1` through `4` in any order. If there are qj questions of type `j`, we can use quadruples (t<sub>1</sub>,t<sub>2</sub>,t<sub>3</sub>,t<sub>4</sub>) with 0≤t<sub>j</sub>≤q<sub>j</sub> for all `j` to represent sequences of answers that answer `T` to exactly t<sub>j</sub> questions of type `j`. We know that there are

![{{q_1} \choose {t_1}} \cdot {{q_2} \choose {t_2}} \cdot {{q_3} \choose {t_3}} \cdot {{q_4} \choose {t_4}}](https://render.githubusercontent.com/render/math?math=%7B%7Bq_1%7D%20%5Cchoose%20%7Bt_1%7D%7D%20%5Ccdot%20%7B%7Bq_2%7D%20%5Cchoose%20%7Bt_2%7D%7D%20%5Ccdot%20%7B%7Bq_3%7D%20%5Cchoose%20%7Bt_3%7D%7D%20%5Ccdot%20%7B%7Bq_4%7D%20%5Cchoose%20%7Bt_4%7D%7D)

sequences of answers represented by this particular quadruple. If we filter the quadruples by the ones that give each student their actual score, we are effectively enumerating answers that are consistent with the input. This is what we did for Test Set 1! In this way, we can count which amount t<sub>j</sub> of questions of type `j` has the largest probability and choose that one, for each `j`.

There are at most (**Q**/4)<sup>4</sup> quadruples to check. This makes the time complexity of the algorithm O(**Q**<sup>4</sup>), but the `1/256` constant is pretty significant, and a good implementation runs comfortably in time.

But wait! We can refine this solution even more by using the solution for Test Set 2 that ends with solving the system of equations! We can express the score of each student as a linear function of t<sub>1</sub>,t<sub>2</sub>,t<sub>3</sub> and t<sub>4</sub>. That gives us a system of `3` equations and 4 unknowns. That means that we only need to try all possible values for one of the t<sub>j</sub> and then simply solve the system to find unique values for the other three. That refines the solution above to requiring only O(**Q**) time.

## Test Data

We recommend that you practice debugging solutions without looking at the [test data](https://codejam.googleapis.com/dashboard/get_file/AQj_6U0JPLA4Swi75ar-kXkSaDM9MwG-keixzUy4qy1uLnY9EWFhaVKPK-z5IRMHMFs/test_data.zip).
