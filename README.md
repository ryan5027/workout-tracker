# Workout Tracker V2 — Timer + At-Home Generator

This release combines the timer update and the Garage/Basement workout generator.

## New in this version
- Automatic rest timer starts when a gym set is marked complete
- Dedicated Timer tab with very large digits
- 1:00, 1:30, 2:00, and 3:00 presets
- Pause, reset, and +/- 30 second controls
- Separate one-off At-Home Workout Generator
- Garage and Basement equipment profiles
- Equipment profiles are editable and stored on the device
- Choose 20, 30, or 45 minutes
- Choose Strength, Mixed, or Conditioning
- Regenerate a different workout at any time
- Generated home workouts do not advance the normal Workout A/B/C rotation

## Existing features preserved
- Suggested next workout with manual override
- Set-by-set weight/reps logging
- Exercise history
- Persistent equipment/setup notes
- Session notes
- Automatic next-weight suggestions
- Local storage and JSON backup/import

## Data preservation
The app continues to use the same local-storage key as V1. Replacing the GitHub Pages files with this release is intended to preserve existing history, notes, and progression data on the same browser/device.

## Home generator setup
The Garage and Basement profiles begin conservatively with Bodyweight selected. Open the generator and check the equipment actually available in each space. The app remembers those selections.

## Current limitation
Generated at-home sessions are one-off plans rather than full logged sessions. They intentionally stay separate from the gym progression system in this version.
