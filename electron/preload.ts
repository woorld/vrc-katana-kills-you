import { ipcRenderer, contextBridge } from 'electron';

const oscApi = {
  changeActive: (isActive: boolean) => ipcRenderer.send('change-active', isActive),
  changeAutoClose: (shouldAutoClose: boolean) => ipcRenderer.send('change-auto-close', shouldAutoClose),
};

contextBridge.exposeInMainWorld('osc', oscApi);

export type OscApi = typeof oscApi;
