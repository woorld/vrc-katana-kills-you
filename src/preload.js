// NOTE: なんか制限付きでimportが使える
import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('osc', {
  changeActive: isActive => ipcRenderer.send('change-active', isActive),
  changeAutoClose: shouldAutoClose => ipcRenderer.send('change-auto-close', shouldAutoClose),
});
