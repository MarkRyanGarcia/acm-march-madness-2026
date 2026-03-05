# The Climb

## Part One

After solving the old capybara’s puzzle, you finally obtain the map to the **Super Canon**. You and your capybara companions follow the map to its destination: a towering stone structure rising high into the sky. At its peak, glinting in the sunlight, sits the Super Canon.

"How are we supposed to get up there?" one of the capybaras asks. "I found an elevator around the corner!", another one replies. "It goes all the way to the top." Unfortunately, when you inspect it, you quickly realize you don't fit inside the elevator. It was designed only for capybaras to get on with a maximum elevator capacity of 80 lbs.

Wandering around trying to find a way to get to the top, you notice that one side of the structure is made of textured rock. Its surface is dotted with small, naturally-formed holes, great as handholds and footholds. You think to yourself, "maybe I can reach the top of the tower by climbing these rocks." Given how high the Super Canon is, you’ll need to carefully plan your ascent. A reckless climb could cost precious time, or even worse, send you tumbling down.

You sketch the climbable side of the tower as a grid to study the available holds. Each position in the grid represents part of the rock wall: a `.` indicates smooth rock that can’t be gripped, while a `#` marks a small hole that can be used as a handhold or foothold.

Your sketch might look something like this:

```
.....#....
.......#..
..#.......
.#......#.
.....#....
..........
..##......
..........
.#....#...
```

You can begin your climb from **any hole (`#`) in the bottom row** of the grid. From there, you move by reaching for another hole somewhere nearby. However, you can only reach so far. A new hold must be **no farther than a [Manhattan distance](https://en.wikipedia.org/wiki/Taxicab_geometry) of 4** from your current position. In other words, if you are currently at row `r1`, column `c1`, you can move to a hole at `r2`, `c2` only if: `|r2 - r1| + |c2 - c1| ≤ 4`.

Climbing downward wouldn’t help you reach the Super Canon any faster, so you never move to a lower row. You may move to holes on the same row or any row above you, as long as they are within reach.

Each time you grab a new hold, it counts as one move. Your goal is to carefully plan a sequence of moves that carries you from the bottom row all the way to any hole in the top row.

Returning to the example above, if you start from the hole in the second column of the bottom row, the closest holds you can reach are the two holes in the seventh row. The holes in the fourth and fifth rows are simply too far away.

One possible shortest path to the top is shown below, with the holds you grab marked as `O`:

```
.....O....
.......O..
..#.......
.#......O.
.....O....
..........
..#O......
..........
.O....#...
```

Following this route, you reach the top row in 5 moves.

**What is the minimum number of moves required to reach any hold in the top row?**

## Part Two

You start climbing, but you quickly realize that you are not built for this.

A few ambitious reaches later, your arms are already burning. Planning the route on paper was easy enough, but actually stretching between distant holds takes serious effort. The original plan seemed ideal, but there was one crucial factor you didn't take into account when tracing your climbing route: exhaustion.

Previously, every move was treated the same. In reality, some reaches are much harder than others. The farther you reach, the more energy it takes. Moving between two holds now costs **energy** equal to their Manhattan distance.

If you move from `(r1, c1)` to `(r2, c2)`, the energy cost is: `|r2 - r1| + |c2 - c1|`. You may still only move to holds within a Manhattan distance of 4, and you may never move downward. Your goal is no longer to minimize the number of moves. Instead, you must minimize the total energy spent reaching any hold in the top row.

**What is the minimum amount of energy required to reach the top?**
