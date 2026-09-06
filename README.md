# Y2K DeskCal

A Windows 10, Windows 11, and Linux desktop calendar app with a system tray icon, big visual calendar, crossed-out past dates, today highlight, side todo pad, bell notifications, snooze/dismiss reminders, and a purple/hot-pink Y2K interface.

## App Preview

![Y2K DeskCal application screenshot](assets/2026-09-05%2019_55_12-Y2K%20DeskCal.png)

## What works in this starter version

- Desktop app with Electron + React
- System tray icon
- Click tray icon to show/hide the calendar
- Big month calendar
- Today's date highlighted
- Past days crossed out with an X
- Local events
- Local todos / side notepad
- Bell reminder notifications
- Snooze 5 / 10 / 30 minutes
- Local storage using Electron Store
- No personal credentials included
- Safe for GitHub

## Not included yet

Google Calendar sync is not wired in this starter build. The app includes placeholders and safe config files for Phase 2. Your private files stay local only and are already listed in `.gitignore`.

## Install

```bash
npm install
```

## Run in development

```bash
npm run dev
```

## Build for Windows

```bash
npm run build:win
```

## Build for Linux

```bash
npm run build:linux
```

## GitHub repo suggestion

`y2k-deskcal`

## Phase 2 ideas

- Google Calendar OAuth sync
- Read-only `.ics` feed import
- Recurring reminders
- Custom bell sound picker
- Startup on boot setting
- Export/import todos
- Theme color editor
