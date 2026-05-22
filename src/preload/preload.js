const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('deskcal', {
  getStore:()=>ipcRenderer.invoke('store:get'), saveEvent:(event)=>ipcRenderer.invoke('event:save',event), deleteEvent:(id)=>ipcRenderer.invoke('event:delete',id),
  saveTodo:(todo)=>ipcRenderer.invoke('todo:save',todo), updateTodo:(todo)=>ipcRenderer.invoke('todo:update',todo), deleteTodo:(id)=>ipcRenderer.invoke('todo:delete',id),
  saveSettings:(settings)=>ipcRenderer.invoke('settings:save',settings), testNotification:()=>ipcRenderer.invoke('notify:test'), snoozeReminder:(eventId,minutes)=>ipcRenderer.invoke('reminder:snooze',{eventId,minutes}),
  showWindow:()=>ipcRenderer.invoke('window:show'), hideWindow:()=>ipcRenderer.invoke('window:hide'),
  onDataChanged:(callback)=>{ const listener=(_event,payload)=>callback(payload); ipcRenderer.on('data:changed',listener); return ()=>ipcRenderer.removeListener('data:changed',listener); },
  onReminderRing:(callback)=>{ const listener=(_event,payload)=>callback(payload); ipcRenderer.on('reminder:ring',listener); return ()=>ipcRenderer.removeListener('reminder:ring',listener); },
  onReminderFocus:(callback)=>{ const listener=(_event,payload)=>callback(payload); ipcRenderer.on('reminder:focus',listener); return ()=>ipcRenderer.removeListener('reminder:focus',listener); }
});
