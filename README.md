# Y2K DeskCal

A Windows 10, Windows 11, and Linux desktop calendar app with a system tray icon, big visual calendar, crossed-out past dates, today highlight, side todo pad, bell notifications, snooze/dismiss reminders, and a purple/hot-pink Y2K interface.

## App Preview

![Y2K DeskCal application screenshot](assets/2026-09-05%2019_55_12-Y2K%20DeskCal.png)

## What works

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
- Windows installer and portable build support
- No personal credentials included
- Safe for GitHub

## Windows Installation

### Option 1: Install the Windows app

If you already have a built copy of Y2K DeskCal:

1. Open the `release` folder.
2. Run:

```text
Y2K DeskCal Setup 0.1.0.exe
```

3. Complete the installer.
4. Launch **Y2K DeskCal** from the Windows Start menu.
5. The app can remain running in the Windows system tray without keeping PowerShell open.
6. Click **Hide to Tray** or close the window to keep the calendar running in the tray.
7. Click the tray icon to reopen the calendar.
8. Use the tray menu and choose **Quit** when you want to fully close the app.

The release folder may also contain:

```text
Y2K DeskCal 0.1.0.exe
```

That is the portable Windows build and can be run without installing the app.

### Option 2: Build it yourself from source

Requirements:

- Node.js
- npm

Clone or download the repository, then open PowerShell or a terminal in the project folder.

Install dependencies:

```bash
npm install
```

Run the development version:

```bash
npm run dev
```

Build the Windows installer and portable app:

```bash
npm run build:win
```

The finished Windows files will be created inside:

```text
release/
```

## Linux

Install dependencies:

```bash
npm install
```

Build the Linux packages:

```bash
npm run build:linux
```

## Not included yet

Google Calendar sync is not wired in this version. The app includes placeholders and safe config files for Phase 2. Private configuration files stay local and are excluded through `.gitignore`.

## Phase 2 ideas

- Google Calendar OAuth sync
- Read-only `.ics` feed import
- Recurring reminders
- Custom bell sound picker
- Startup on boot setting
- Export/import todos
- Theme color editor
