# Analysis

## Test Set 1

In Test Set 1, our only unknown is which hand is which. Since there are only 3! possibilities for the assignment of angles in the input to a specific hand, we can just try them all. After we have angles assigned to specific hands, we can just read the time. The easiest way is to just check the hours hand, as the statement tells us it moves one tick per nanosecond, so the current number of nanoseconds after midnight is equal to the angle in ticks of the hours hand. Notice that we still need to check that the time in the other two hands is consistent with this! We can do this by reading the number of minutes and seconds from their hands using the definitions in the statements, and see if it is consistent with the current number of minutes and seconds as computed from the nanoseconds we got from the hours hand. Alternatively, we can do the reverse process of getting from current time to how the clock should look. We do that in more detail below, as it is needed to solve the other test sets.

The solution to Test Sets 2 and 3 is based on first solving the inverse problem: given a time of the day, find a canonical set of 3 angles that would produce it. Luckily, the way to solve it is explained on the statement: we know the speeds of each hand so we can translate a time of the day into a number of ticks since midnight, and then take it modulo the number of ticks in a full circle (<code>12×10<sup>10</sup>×360</code>). Once we get three angles, we need to consider the potential rotations. We can say that canonical sets of angles always have at least one 0, but there can be up to 3 ways to do that (choosing each hand to be the 0 one): simply choosing the lexicographically least of them (after sorting them) suffices.

## Test Set 2

In Test Set 2, there are only `12×60×60` possible times of the day to consider. We can simply build the canonical representation a for each time t and store it in a reverse dictionary from representations to times (which one we save if there are multiples does not matter) as a first step. Then, for each input, we get its canonical representation and find a corresponding time in the dictionary to output.

## Test Set 3

In Test Set 3, the number of different times of the day is too large to check them all individually. A possible approach is to restrict the number of times of the day that can correspond to a specific input set of angles `a` and then check each of those to see if anyone fully matches by using the reverse conversion.

We can try every possible assignment of each angle to a specific hand. There are only `3!` possibilities for that. Let us say that we now have an angle of <code>a<sub>h</sub></code> for the hours hand, <code>a<sub>m</sub></code> of the minutes hand and as for the seconds hand.

Let us write the real time as `h` full hours plus `n` nanoseconds, that is, <code>h⋅3600⋅10s<sup>9</sup>+n</code> nanoseconds since midnight, with `h` between `0` and `11`. The angle (in ticks) of the minute hand is `12⋅n` and the angle of the hour hand is <code>h⋅3600⋅10<sup>9</sup>+n</code>. The difference between those two numbers <code>h⋅3600⋅10<sup>9</sup>−11⋅n</code> needs to be equal to the difference between the angles we read from the input <code>a<sub>h</sub></code>−<code>a<sub>m</sub></code>. Note that this works because the difference between angles is invariant through rotations. If we try every possible value for `h` between `0` and `11`, every variable except `n` in the last equality has an actual value, and we can solve for `n`. If the value for `n` happens to be an integer, it gives us a real time candidate.

Finally, for each of the up to `3!⋅12` real time candidates, we do the reverse check as we did in the previous solution.

## Test Data

We recommend that you practice debugging solutions without looking at the [test data](https://codejam.googleapis.com/dashboard/get_file/AQj_6U19PE4QStRcofr2G0S3dOV21K1BXXD6ooSyTr_McX9-LHi-tTClvO9euCRMpe0/test_data.zip).
