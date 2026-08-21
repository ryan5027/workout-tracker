# Workout Tracker V1

A phone-first Progressive Web App for logging a rotating 3-workout training block.

## Included in V1
- Prompts the next workout but allows manual override
- Displays exercises plus prescribed sets and rep ranges
- Logs weight and reps set-by-set
- Shows the most recent performance for each exercise
- Full exercise history
- Persistent equipment/setup notes
- Session-specific notes
- Suggested next weight:
  - if every prescribed set reaches the top of the rep range, adds the exercise's programmed increment
  - otherwise suggests repeating the previous weight
- Automatically advances the recommended workout after completion
- Local browser storage
- JSON backup export/import
- Offline-capable PWA shell

## Run it
Serve this folder from any static web host or local web server. Opening index.html directly may work for basic use, but PWA installation and offline caching require HTTPS (or localhost).

## Current limitation
Data is local to one browser/device. Cloud sync, authentication, editing programs in-app, and AI-assisted block creation are intentionally deferred until the basic gym workflow has been tested.
