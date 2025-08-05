import { app, BrowserWindow, ipcMain } from 'electron';
import { Server } from 'node-osc';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..');

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST;

const oscDeadMessage = '/avatar/parameters/BJK/IsDead';
let oscServer: Server;
let isActive = false;
let shouldAutoClose = false;

let mainWindow: BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    width: 600,
    height: 400,
    minWidth: 480,
    minHeight: 280,
    title: 'VRC Katana Kills You',
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
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

    // console.log('IsDead Listened'); // テスト用
    setTimeout(() => {
      // 死んだらn秒後にVRCを殺す
      execSync('taskkill /IM VRChat.exe');

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
      input.alt
    ];

    if (disabledShortcuts.some(Boolean)) {
      event.preventDefault();
    }
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show();
  });

  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    mainWindow.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    oscServer.close();
    app.quit();
    mainWindow = null;
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})

app.whenReady().then(createWindow);
