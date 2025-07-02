const { app, BrowserWindow, ipcMain } = require('electron');
const { Server } = require('node-osc');
const path = require('path');
const { exec } = require('child_process');

const oscDeadMessage = '/avatar/parameters/BJK/IsDead';
let oscServer;
let isActive = false;

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    minWidth: 420,
    minHeight: 300,
    title: 'VRC Katana Kills You',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    autoHideMenuBar: true,
    show: false, // ページがロードされるまではウィンドウを非表示にする
  });

  oscServer = new Server(9001, '0.0.0.0', () => {
    console.log('VRC Katana Kills You: Start listening');
  });

  oscServer.on(oscDeadMessage, (value) => {
    if (value[1] && isActive) {
      // 死んだら1秒後にVRCを殺す
      setTimeout(() => exec('taskkill /IM VRChat.exe'), 1000);
      // console.log('IsDead Listened'); // テスト用
    }
  });

  ipcMain.on('change-active', async () => {
    // OSCのリッスンを一時停止するほうがいいかも？
    isActive = !isActive;
  });

  // mainWindow.webContents.openDevTools(); // TODO: 開発時のみ実行されるようにする
  mainWindow.loadFile('index.html');
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  // 各種ショートカットの無効化
  mainWindow.webContents.on('before-input-event', (event, input) => {
    const disabledShortcuts = [
      input.control && input.code === 'KeyR',
      input.code === 'F5',
      input.code === 'F12',
      input.shift && input.control && input.code === 'KeyI',
    ];

    if (disabledShortcuts.some(Boolean)) {
      event.preventDefault();
    }
  });
};

app.once('ready', () => {
  createWindow();
});

app.once('window-all-closed', () => {
  oscServer.close();
  app.quit();
});
