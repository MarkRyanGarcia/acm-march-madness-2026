# Robbery Puzzle

## Part One

You fixed the fruit machine, which is now operating as intended and capable of producing many fruits for the Super Canon! But there is a bigger problem now. No one seems to know where the Super Canon actually is.

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
6,3
4,6
8,5
10,4

3,3 ^
7,4 <
5,7 v
9,6 >
```

The first section lists the locations of all golden tubers. After a blank line, the second section lists the locations of the guards along with the direction each guard is facing.

Each position is written as a pair of coordinates `(x, y)`. Guards also include a direction: `^`, `v`, `<`, or `>`.

The guards watch the area in a narrow 45-degree field of view in front of them. Each guard can see in three directions at once: the direction they are facing, as well as the diagonal directions immediately to the left and right of that direction. For example, a guard facing `^` watches upward, up-left, and up-right, while a guard facing `>` watches right, up-right, and down-right.

However, guards cannot see indefinitely. Each guard has a visibility maximum radius of 10 tiles. Any position farther away than this distance is outside their field of view.

If a golden tuber lies along one of the directions a guard is watching, that tuber is considered **guarded**. Any tuber that cannot be seen by any guard could potentially be stolen by a particularly sneaky capybara. The goal is to find how many golden tubers are outside the guards' field of view.

Looking at the previous example, the golden tubers at coordinates `(4, 6)` and `(8, 5)` appear to sit just outside the guards' FOV, meaning they can be stolen. Therefore, the answer for this example would be `2`.

Given the list of tuber locations and the positions and directions of the guards, determine **how many golden tubers are outside the field of view of every guard**.

## Part Two

"Hold on, this puzzles sounds a lot like that [old iPad game](https://robberybob.fandom.com/wiki/Robbery_Bob_Wiki) back in the day," you think to yourself.

"Oh yeah! I almost forgot," it replies. It turns out that the guards can turn their heads around by 45 degrees, so they can switch where they are looking for at any given time. However, because they are **synchronized**, **every other guard** will turn their head around also.

You glance back at the parchment and then at the capybara. "Are the guards… able to turn their heads?"

"Oh yeah! I almost forgot," the capybara replies, slapping his forehead with a paw. "They do that all the time."

It turns out the guards are not limited to the direction shown on the parchment. At any moment, a guard can rotate their head **by 45 degrees** to look in a new direction. However, the guards were trained together, and they always move in perfect unison: whenever one guard rotates their head, every other guard rotates their head by the same amount as well.

In other words, the guards may all rotate their viewing direction by the same multiple of 45° at the same time. After each rotation, their field of view still consists of the direction they are facing and the two adjacent diagonal directions, and their visibility radius remains **10 tiles**. Because the guards are synchronized, you cannot rotate them independently; you must choose a single rotation that applies to all guards.

If you time your heist correctly, you might be able to steal more tubers when the guards are looking somewhere else.

Using the previous example:

```
2,2
6,3
4,6
8,5

3,3 ^
7,4 <
5,7 v
```
