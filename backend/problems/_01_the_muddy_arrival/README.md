# The Muddy Arrival

On your way to ACM General, the ground vanished. After a dizzying fall through a purple void, you stick the landing face-first into a pile of very soft, very damp moss.

As you scrape the moss off your face, you find yourself surrounded by a group of large, remarkably chill rodents. "Welcome to Capybara Village," one says, balancing a lemon on its head. "You fell from the Sky-Void. Happens sometimes. If you want to get back, you'll need the Super Cannon, but it’s been lost since the Great Mango Winter."

## Part One

The village elder tells you the first step is to visit the Fruit Shop across the Great Muddy River to gather supplies. However, the bridge is washed out. To cross, you need to place stepping stones.

The capybaras give you a list of "Elevation heights" for the riverbed. To make a stable path, you need to identify "Safety Peaks". A Safety Peak is the first riverbed coordinate to the right of your current position that is strictly taller than the one you are standing on. If there is no taller coordinate ahead, you’ll just have to leap into the mud (represented by a -1).

You are given a list of riverbed heights. For each position, find the height of the next taller stone to its right.

For example, if the riverbed heights are: `[4, 2, 5, 3]`

- At 4, the next taller stone is 5.
- At 2, the next taller stone is 5.
- At 5, there is nothing taller to the right, so -1.
- At 3, there is nothing taller to the right, so -1.

Result: [5, 5, -1, -1]
The sum of these heights is `5 + 5 = 10`. So, the answer for this example would be **10**.

Given the list of riverbed heights, **what is the sum of all the "Safety Peak" heights?** (Exclude the -1s from your sum).

## Part Two

The capybaras are impressed, but the mud is rising! A simple path won't do. The weight of a human requires a more stable foundation. To build a bridge that won't sink, you need to calculate the "Pressure Span" of each stone.

The capybaras explain that a stone stays stable by "locking" against the stones placed before it. A stone’s Span is the number of consecutive stones (starting from itself and looking backwards) that are shorter than or equal to its own height.

As soon as you hit a stone to the left that is strictly taller than the current one, the "locking" support stops.

For example, if the riverbed heights are `[10, 4, 5, 90, 120, 80]`:

- 10: It's the first stone. Nothing is behind it. (Span: 1)
- 4: Since 10 is taller than 4, the support stops immediately. (Span: 1)
- 5: It looks back and sees 4. Since 5 >= 4, it locks onto it. It then sees 10, which is taller, so it stops. (Span: 2 - itself and the 4)
- 90: It looks back and sees 5, 4, and 10. All are shorter than or equal to 90. (Span: 4)
- 120: It is taller than everything before it. (Span: 5)
- 80: The stone before it is 120. Since 120 is taller than 80, it can't lock onto anything further back. (Span: 1)

Resulting Spans: [1, 1, 2, 4, 5, 1]
The Total Stability Rating of these heights is `1 + 1 + 2 + 4 + 5 + 1 = 14`. So, the answer for this example would be **14**.

Using a stack to keep track of previous heights and their indices efficiently, calculate the spans for the given riverbed.

**What is the Total Stability Rating (the sum of all the spans) for the bridge?**
