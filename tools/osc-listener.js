const { Server } = require('node-osc');
const readline = require('readline');
const { oscSetting } = require('./constants');

const log = (str) => console.log('osc-listener: ' + str);

const oscServer = new Server(oscSetting.port, oscSetting.host, () => {
  log('Start Listening');
});

oscServer.on('message', (message) => {
  log(`Message Received - ${message}`);
});

const onExit = () => {
  log('End Listening');
  oscServer.close();
  process.stdin.pause();
};

// キー入力1つ1つに対してイベントを発行させる
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (_str, key) => {
  if (!key.ctrl || !key === 'c') {
    return;
  }
  onExit();
});
