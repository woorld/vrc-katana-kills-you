// NOTE: サンドボックスが有効（nodeIntegration: false）な場合、preloadスクリプトはESModuleが使えない
const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('osc', {
  changeActive: isActive => ipcRenderer.send('change-active', isActive),
});
