# Workout Tracker V3 — Strength Block + Smart Training Tools

## Active program
The already-approved **5-Week Full Body Strength Block** activates on upgrade. Existing workout history is preserved under the same local-storage key. Week 5 is a programmed deload.

## New gym features
- Approved-only exercise substitutions
- Frequently used approved substitutions rise to the top of the list
- Substitute exercises keep separate history/PRs, while the gray suggested load still comes from the prescribed exercise
- One optional 1–10 RPE rating per exercise
- Per-exercise rest timers shown above the exercise that started the timer
- Programmed supersets with a per-session **Do separately** override
- End-of-workout summary: duration, completed working sets, PRs, progressed exercises
- PRs for heaviest weight and best weight at a specific rep count
- Exercise progress charts with Best Weight / Estimated 1RM toggle and time filters
- Missed target sets hold the same load next time; complete all sets at the top of the rep range to progress
- Deload: ~90% of last normal working load; 4 sets→3, 3→2, 2→1; deload data ignored for progression

## Program updates
`program.json` is now the remote-program channel. A future program with a higher `version` appears as **New program available**. The app shows the summary and complete workouts before approval. Approved programs activate after the current block is completed.

## Home generator
Garage and Basement sessions are disposable and do not enter gym history. Modes: **Move**, **Condition**, **Mobility + Core**. Times: **10 / 20 / 30 / 45 min**. Garage uses the actual TRX/jump-rope/kettlebell/sandbag equipment profile. Basement emphasizes treadmill work and supports weighted-vest incline walking plus faster non-vest intervals.

## Backup
Manual JSON export/import remains available. V3 also contains optional automatic cloud backup with Google and email/password sign-in through Firebase. See `FIREBASE_SETUP.md` for the one-time connection steps.
