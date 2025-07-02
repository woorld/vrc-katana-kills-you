// NOTE: サンドボックスが有効（nodeIntegration: false）な場合、preloadではESModuleが使えない
const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('osc', {
  changeActive: isActive => ipcRenderer.send('change-active', isActive),
  changeAutoClose: shouldAutoClose => ipcRenderer.send('change-auto-close', shouldAutoClose),
});
