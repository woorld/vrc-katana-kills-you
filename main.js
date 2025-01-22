// @ts-check
import { Server } from 'node-osc';
import child_process from 'child_process';

const { exec } = child_process;
const oscDeadMessage = '/avatar/parameters/BJK/IsDead';

const oscServer = new Server(9001, '0.0.0.0', () => {
  console.log('VRC Katana Kills You: Start listening');
});

// value[0]にメッセージ、value[1]に値が入っている
oscServer.on(oscDeadMessage, (value) => {
  if (value[1]) {
    // 死んだら1秒後にVRCを殺す
    setTimeout(() => exec('taskkill /IM VRChat.exe'), 1000);
  }
});
