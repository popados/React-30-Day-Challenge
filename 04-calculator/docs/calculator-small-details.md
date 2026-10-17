# Small details by calculator type

Concrete examples of the small behaviours in the Calculator Workbench (artifact) and the desktop mockup (`mockups/ui-screen-04-calculator.svg`). Each example is something you can try in the artifact. Type notes live in [calculator-types.md](calculator-types.md).

## Shared across every tab

| Detail | Example |
|---|---|
| Copy gives the raw value | The readout shows `1,030`; Copy puts `1030` on the clipboard and the toast says "Copied 1030". A negative shows as `−12` (true minus sign) but copies as `-12`. |
| Faded preview | While you type `2×sin(30)+√(16`, the result `5` shows at reduced opacity until you press `=`. |
| Last good result stays | Clear a required field in Percent and the previous answer stays (faded) with a red message such as "Enter of value" under it, so the result area never goes blank. |
| Fields accept arithmetic | Type `12*3.5` or `240/2` into any number field in Convert, Percent or Dates. |
| Tape restores inputs, not just answers | Tapping "15% of 240 → 36" switches to Percent, opens the "% of" calculation and refills 15 and 240. Each line carries a colored dot for its mode. |
| Two-step clear | Clear on the tape turns into "Confirm clear" for 3 seconds; only a second tap empties it. The tape keeps the last 60 entries. |
| Result size fits the space | A long result shrinks to fit the readout width instead of wrapping (new in the responsive version). |

## Scientific

| Detail | Example |
|---|---|
| Ghost closing bracket | Type `sin(30`; the line shows `sin(30` with a faded `)` and evaluates as if it were closed. The tape stores `sin(30)`. |
| Angle unit on the tape | `sin(30)×√(144)+2^10 = 1,030` is saved as `sin(30)×√(144)+2^10  [deg]`, so a later reader knows it was degrees. |
| Trig snaps to zero | `sin(180)` in DEG gives `0`, not `1.2246e-16`. |
| Undefined angles are named | `tan(90)` in DEG shows "tan is undefined at this angle" instead of a huge number. |
| Implied multiplication | `2π`, `3(4+1)` and `2sin(30)` all work without typing ×. |
| Chaining with Ans | After `= 1,030`, pressing `+` starts `Ans+`; pressing a digit starts a fresh expression. |
| EXP key | `3 EXP 8` enters `3×10^8` = `300,000,000`. |
| Percent as a postfix | `50%` is 0.5, so `200×15%` = `30`. |
| Plain-language errors | `5÷0` gives "Can't divide by 0"; `171!` gives "The result is too large to show"; `ln(0)` gives "ln needs a number above 0". |
| Display precision | 12 significant digits; values at or above 1e15 (or below 1e-9) switch to `1.5e15` style. |
| Key colors | Numbers white, operators blue, functions grey, clear and delete red, `=` the tall orange key (two rows high). |

## Convert (units and currency)

| Detail | Example |
|---|---|
| Two-way typing | Type `10` in From (km) and To fills `6.21371` mi; type `5` in To and From fills `8.04672` km. |
| Swap keeps the number | With 10 km → 6.21371 mi, Swap gives 6.21371 mi → 10 km rather than resetting to 1. |
| Reverse rates under the result | Rows show `1 km = 0.621371 mi` and `1 mi = 1.60934 km`. |
| Precision setting | Switch 6 to 10 significant digits and the result becomes `6.213711922`. |
| Exact factors and offset temperature | 1 in is exactly 2.54 cm; 1 °C = 33.8 °F because temperature uses a formula with an offset, not a factor. |
| Decimal vs binary data | The default pair is GB → GiB: 1 GB = 0.931323 GiB, with a hint that KB/MB/GB use 1000 and KiB/MiB/GiB use 1024. |
| Currency minor units | 100 USD → JPY shows `15,000` (no decimals); USD → EUR shows `92.00`. The rate field is editable and labelled as sample data, not live rates. |
| "In every unit" grid | 10 km also lists 10,000 m, 393,701 in, 5.39957 nmi and so on; tapping one makes it the target unit. |

## Percent

| Detail | Example |
|---|---|
| % of, with add and subtract rows | 15% of 240 = `36`, plus `240 + 15% = 276` and `240 − 15% = 204`. |
| What % | 45 of 180 = `25%`, with the fraction `0.25`. |
| Signed change | 80 → 92 = `+15%`, difference `+12`, direction "Increase". From 0 shows "The starting value can't be 0". |
| Stacked discounts, cent by cent | $129.99 − 25% = $97.49, then − 10% = $87.74, + 8.25% tax ($7.24) = `94.98`. You save $42.25 (32.5%). The discounts are applied one after the other, never added to 35%. |
| Add tax or take it out | $250 before 20% tax → gross `$300.00`. $250 tax included → net `$208.33`, tax `$41.67`. |
| Money formatting | Always two decimals with trailing zeros (`$300.00`, not `$300`). |

## Dates

| Detail | Example |
|---|---|
| Several readings of one span | 17 Oct 2026 → 25 Dec 2026 = `69 days`, also `9 weeks, 6 days`, `2 months, 8 days`, and the business-day count. |
| Inclusive toggle | "Count the end date too" turns 69 days into 70. |
| End before start | Swapped dates still give a positive count, with a note that the end is before the start. |
| Month-end clamping | 31 Jan + 1 month = 28 Feb (29 in a leap year), with the note "Moved to the last day of the month". |
| Business days | 90 business days from a Friday skips every Saturday and Sunday. |
| Time-zone safe | All date math runs in UTC days, so a daylight-saving change never shifts a result by a day. |
| Copy gives ISO | The readout says `Fri, Dec 25, 2026` but Copy gives `2026-12-25`. |

## In the type notes but not in the workbench yet

Basic (repeat `=` repeats the last operation), Tip (remainder cents go to one payer when splitting), Mortgage (final payment adjusted so the balance ends at exactly 0, rate nudged in 0.125% steps), BMI (category shown with a text label, not color alone), Programmer (A–F keys disabled outside HEX) and Fraction (exact rational math) have no tab in the workbench.
