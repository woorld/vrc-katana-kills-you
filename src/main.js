const { app, BrowserWindow, ipcMain } = require('electron');
const { Server } = require('node-osc');
const path = require('path');
const { execSync } = require('child_process');

const oscDeadMessage = '/avatar/parameters/BJK/IsDead';
let oscServer;
let isActive = false;
let shouldAutoClose = false;

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    minWidth: 480,
    minHeight: 280,
    title: 'VRC Katana Kills You',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    autoHideMenuBar: true,
    show: false, // ページがロードされるまではウィンドウを非表示にする
  });

  // TODO: OSC関連処理の分割
  oscServer = new Server(9001, '0.0.0.0', () => {
    console.log('VRC Katana Kills You: Start listening');
  });

  oscServer.on(oscDeadMessage, async (value) => {
    if (!value[1] || !isActive) {
      return;
    }

    setTimeout(() => {
      // 死んだらn秒後にVRCを殺す
      execSync('taskkill /IM VRChat.exe');
      // console.log('IsDead Listened'); // テスト用

      if (shouldAutoClose) {
        oscServer.close();
        app.quit();
      }
    }, 2800);
  });

  // 設定変更時の処理
  ipcMain.on('change-active', () => {
    // OSCのリッスンを一時停止するほうがいいかも？
    isActive = !isActive;
  });

  ipcMain.on('change-auto-close', () => {
    shouldAutoClose = !shouldAutoClose;
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

  // mainWindow.webContents.openDevTools(); // TODO: 開発時のみ実行されるようにする

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.loadFile('index.html');
};

app.once('ready', () => {
  createWindow();
});

app.once('window-all-closed', () => {
  oscServer.close();
  app.quit();
});
