# The Fruit-Making Machine

## Part One

You arrive at the Fruit Shop, but the "Smoothie-Matic 3000" is coughing up smoke. "We need this machine to compress fruits into Warp-Fuel for the Super Cannon!" the shopkeeper cries. "But the pressure sensor is broken. It can only handle a sliding batch of 50 fruits at a time."

To create stable fuel, the machine must identify the maximum sugar content (fruit size) in every possible window of 50 fruits. However, the shopkeeper is worried about "Pressure Spikes", specific moments when the maximum fruit size in the current window is significantly larger than the maximum of the previous window.

The Task:

1. Generate the list of maximum values for every sliding window of **size 50**.
2. A "Pressure Spike" is defined as any window where the maximum value is **at least 10 units higher** than the maximum value of the window immediately before it.


For example, if the window maximums are:
```
100
102
115
116
130
```
then the spikes occurred at 115 (since `115 - 102 >= 10`) and 130 (since `130 - 116 >= 10`). `Total Spikes: 2`.

**How many "Pressure Spikes" did the machine record during the calibration run?**

## Part Two

The machine is calibrated, but now the Density Buffer is overflowing. The Super Cannon needs "High-Density" fuel, which means smaller, weaker fruits must be filtered out to prevent the fuel from being too watery.

The buffer has a strictly limited capacity of **100** fruits. Using the same sequence of fruits from Part One, follow these "Squashing" rules:

1. Fruits arrive one by one from the conveyor belt.
2. Before adding a new fruit X: If the buffer is full, the fruit at the very front is ejected.
3. After adding fruit X to the back: Compare X to the fruit immediately in front of it. If that fruit is strictly smaller than X, it is "squashed" (removed). Repeat this until the fruit in front of X is >= X.

**The Ignition Code:**
Once the fuel is refined, the machine displays the Final Density Sequence in the buffer. To get the Ignition Code, take the first fruit size, the middle fruit size (if the final buffer has an even number of fruits, take the index at size/2), and the last fruit size currently in the buffer and concatenate them into one long number.

Example: If the final buffer is `[42, ..., 15, ..., 9]`, the Ignition Code is `42159`.

**What is the final Ignition Code shown on the machine's display?**
