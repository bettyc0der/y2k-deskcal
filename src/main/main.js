const { app, BrowserWindow, Tray, Menu, ipcMain, Notification, nativeImage, shell } = require('electron');
const path = require('path');
const { pathToFileURL } = require('url');
const { initStoreHandlers, getStoreSnapshot, snoozeReminder } = require('./store');
const { scheduleReminderLoop } = require('./reminders');

let mainWindow = null;
let tray = null;
let reminderLoop = null;
const isDev = !app.isPackaged;
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

function getAssetPath(fileName) {
  if (app.isPackaged) return path.join(process.resourcesPath, 'assets', fileName);
  return path.join(__dirname, '..', '..', 'assets', fileName);
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280, height: 820, minWidth: 980, minHeight: 640, show: false,
    backgroundColor: '#1c1f42', title: 'Y2K DeskCal', icon: getAssetPath('tray-icon.png'),
    webPreferences: { preload: path.join(__dirname, '..', 'preload', 'preload.js'), contextIsolation: true, nodeIntegration: false, sandbox: false }
  });
  if (isDev) mainWindow.loadURL('http://127.0.0.1:5173');
  else mainWindow.loadFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.on('close', (event) => { if (!app.isQuitting) { event.preventDefault(); mainWindow.hide(); } });
  mainWindow.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
}

function createTray() {
  const icon = nativeImage.createFromPath(getAssetPath('tray-icon.png'));
  tray = new Tray(icon.isEmpty() ? nativeImage.createEmpty() : icon.resize({ width: 16, height: 16 }));
  tray.setToolTip('Y2K DeskCal');
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Open Y2K DeskCal', click: () => toggleWindow(true) },
    { label: 'Hide', click: () => toggleWindow(false) },
    { type: 'separator' },
    { label: 'Quit', click: () => { app.isQuitting = true; app.quit(); } }
  ]));
  tray.on('click', () => toggleWindow());
}

function toggleWindow(forceShow) {
  if (!mainWindow) return;
  if (forceShow === true) { mainWindow.show(); mainWindow.focus(); return; }
  if (forceShow === false) { mainWindow.hide(); return; }
  mainWindow.isVisible() ? mainWindow.hide() : (mainWindow.show(), mainWindow.focus());
}

function sendToRenderer(channel, payload) {
  if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send(channel, payload);
}

function showReminderNotification(event, playSound = true) {
  const notification = new Notification({
    title: 'Bell reminder',
    body: `${event.title} starts soon${event.startTime ? ` at ${new Date(event.startTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}` : ''}.`,
    icon: getAssetPath('tray-icon.png'),
    silent: true
  });
  notification.on('click', () => { toggleWindow(true); sendToRenderer('reminder:focus', event); });
  notification.show();
  if (playSound) sendToRenderer('reminder:ring', { event });
}

app.whenReady().then(() => {
  initStoreHandlers(ipcMain);
  createWindow(); createTray();
  reminderLoop = scheduleReminderLoop({ getSnapshot: getStoreSnapshot, onReminder: showReminderNotification, onChange: () => sendToRenderer('data:changed', getStoreSnapshot()) });
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); toggleWindow(true); });
});
app.on('window-all-closed', (event) => event.preventDefault());
app.on('before-quit', () => { app.isQuitting = true; if (reminderLoop) clearInterval(reminderLoop); });

ipcMain.handle('window:toggle', () => toggleWindow());
ipcMain.handle('window:show', () => toggleWindow(true));
ipcMain.handle('window:hide', () => toggleWindow(false));
ipcMain.handle('notify:test', () => { showReminderNotification({ id: 'test', title: 'Test Bell Notification', startTime: new Date(Date.now() + 60*60*1000).toISOString() }, false); return { ok: true }; });
ipcMain.handle('reminder:snooze', (event, payload) => { const result = snoozeReminder(payload.eventId, payload.minutes); sendToRenderer('data:changed', getStoreSnapshot()); return result; });
