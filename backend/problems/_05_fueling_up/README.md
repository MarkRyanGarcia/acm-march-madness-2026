# Fueling Up

You arrive at the Super Cannon. The teleporter terminal flickers to life, displaying a single, demanding requirement: it needs an exact weight to stabilize the jump.

## Part One

The teleporter requires has a fruit weight requirement to initiate a jump. You have a specific collection of unique fruits available, and each fruit can be used at most once.

Each fruit has:
- **A Fruit ID**
- **A Weight** (in pounds)
- **An Energy Value**

For Example, if the weight requirement was **50 pounds**:
```
Fruit ID | Weight (lbs) | Energy Value
A 5 10
B 8	20
C 12 35
D 15 40
E 20 60
F 25 70
```

There are a few ways to hit exactly 50:

```
F + D + A: 25+15+5=50 lbs → 70+40+10=120 Energy
F + E + A: 25+20+5=50 lbs → 70+60+10=140 Energy
```

Winner: Fruits `A`, `E`, and `F`.
`Answer: 140`

**Determine the maximum total energy you can generate using a combination of fruits that weighs exactly 5000 pounds.**

## Part Two

Just as you prepare to activate the teleporter, the terminal crackles again:

> “Warning: Fuel replication protocol enabled.”

You watch in amazement as a fruit you insert is… still there.

The system appears to have a duplication glitch:

- **Unlimited Supply**: You may now use each type of fruit any number of times.
- **Instability Warning**: The terminal now warns: “Minimize fuel instability. Reduce item count.”

It seems that while you can use as many fruits as you like, using too many may destabilize the jump.

**What is the minimum number of fruits required to reach exactly X pounds? You may use each fruit unlimited times**