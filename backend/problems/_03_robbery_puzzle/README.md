# Robbery Puzzle

## Part One

You fixed the fruit machine, which is now operating as intended and capable of producing many fruits for the Super Canon! But now, there are bigger fish to fry. No one seems to know where the Super Canon actually is.

The elders gather in a circle, scratching their whiskers and muttering thoughtfully. Eventually, one very old capybara slowly waddles forward. "I used to know where it was," he says, staring into the distance. "Back in my younger days... before the Mango Winter."

The crowd gasps.

"But alas," he sighs, "time flows like a river, and memories drift away like floating oranges. I no longer remember the location."

The crowd groans.

Just as the meeting seems doomed to dissolve into confused squeaking, a voice calls out from the back.

"Ahem." Another capybara steps forward dramatically, brushing imaginary dust off his fur. "I know where the Super Canon is." Everyone turns around.

The capybara who claimed to know the location of the Super Canon squints at you for a moment, then slowly rolls out a large sheet of parchment.

"Before I reveal anything," he says, "I need help solving a small problem. My nephew has been asking me about this situation, and I can't quite figure it out anymore."

The parchment contains a rough diagram of a storage area where several **golden tubers** are kept. Guards have been stationed around the area to prevent anyone from sneaking in and stealing them.

Rather than drawing the entire map, the parchment simply lists the coordinates of important objects. It looks something like the following:

```
2,2
4,3
6,2
5,6
3,7
8,5

3,3 ^
7,4 <
5,7 v
9,6 >
```

The first section lists the locations of all golden tubers. After a blank line, the second section lists the locations of the guards along with the direction each guard is facing.

Each position is written as a pair of coordinates `(x, y)`. Guards also include a direction: `^`, `v`, `<`, or `>`.

The guards watch the area in a **90-degree field** of view in front of them, and are able to see everything that is within their range of vision. For example, a guard that is facing `^` at coordinates `(3, 3)`, would be able to see objects at coordinates `(2, 4)`, `(3, 4)`, and `(4, 4)`. However, they wouldn't be able to see an object at coordinates `(3, 2)` because it's directly behind them.

Guards can also see objects a couple tiles away from them, with a visibility maximum radius of **10 tiles**. The distance between two positions is measured using [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance). Any position farther away than this distance is outside their field of view. Additionally, they are able to spot overlapping objects in the same line of sight because of their advanced ocular vision.

If a golden tuber lies along one of the directions a guard is watching, that tuber is considered **guarded**. Any tuber that cannot be seen by any guard could potentially be stolen by a particularly sneaky capybara. The goal is to find how many golden tubers are outside the guards' field of view.

Looking at the previous example, the only golden tuber that is completely unguarded sits at coordinates `(8, 5)`, meaning it can be stolen. Therefore, the answer for this example would be `1`.

Given the list of tuber locations and the positions and directions of the guards, determine **how many golden tubers are outside the field of view of every guard**.

## Part Two

You are about to present your solution when you are suddenly interrupted. "Oh yeah! I almost forgot," the capybara says, slapping his forehead with a paw. "It turns out the guards are not limited to the direction shown on the parchment." At any moment, a guard can rotate their head **by 45 degrees** to look in a new direction.

However, the guards were trained together, and they always move in perfect unison: whenever one guard rotates their head, **every other guard** rotates their head by the same amount as well.

In other words, the guards may all rotate their viewing direction by the same multiple of 45 degrees at the same time. After each rotation, their field of view still remains 90 degrees in the new direction they are facing, and their visibility radius remains **10 tiles**.

If you time your heist correctly, you might be able to steal more tubers when the guards are looking somewhere else.

Using the previous example:

```
2,2
4,3
6,2
5,6
3,7
8,5

3,3 ^
7,4 <
5,7 v
9,6 >
```

At a certain rotation, when the guards are looking away, you will be able to steal the tubers at coordinates `(4, 3)`, `(6, 2)`, and `(8, 5)`. Alternatively, you could wait for another rotation and steal the tubers at `(4, 3)`, `(5, 6)`, and `(3, 7)`; In both cases, the maximum number of tubers that can be stolen is `3`.

Given this new information, **what is the maximum number of tubers that you can steal**?
