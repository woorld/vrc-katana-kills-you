import { app, BrowserWindow } from 'electron';
import { Server } from 'node-osc';
import path from 'path';
import child_process from 'child_process';

const { exec } = child_process;
const oscDeadMessage = '/avatar/parameters/BJK/IsDead';

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    title: 'VRC Katana Kills You',
    webPreferences: {
      preload: path.join(import.meta.dirname, 'preload.js'),
    },
  });

  const oscServer = new Server(9001, '0.0.0.0', () => {
    console.log('VRC Katana Kills You: Start listening');
  });

  oscServer.on(oscDeadMessage, (value) => {
    if (value[1]) {
      // 死んだら1秒後にVRCを殺す
      setTimeout(() => exec('taskkill /IM VRChat.exe'), 1000);
    }
  });

  mainWindow.webContents.openDevTools(); // TODO: 開発時のみ実行されるようにする
  mainWindow.loadFile('index.html');
};

app.once('ready', () => {
  createWindow();
});

app.once('window-all-closed', () => app.quit());
