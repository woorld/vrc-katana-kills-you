// NOTE: サンドボックスが有効（nodeIntegration: false）な場合、preloadスクリプトはESModuleが使えない
const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('osc', {
  toggleActive: () => ipcRenderer.invoke('toggle-active'),
});
