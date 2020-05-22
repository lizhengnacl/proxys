/**
 * Created by lee on 2020/5/22 13:05
 */
const { exec } = require('child_process');

function cmd(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

function initMkcert() {
  return new Promise((resolve, reject) => {
    cmd('mkcert -install')
      .then((res) => {
        resolve(true);
      })
      .catch((err) => {
        resolve(false);
      });
  });
}

function isMkcertExits() {
  return new Promise((resolve, reject) => {
    cmd('mkcert')
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function installCert({ host, path }) {
  return new Promise((resolve, reject) => {
    let cmdStr = `mkdir -p ${path} && cd ${path} && mkcert ${host}`;
    cmd(cmdStr)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = cmd;
module.exports.isMkcertExits = isMkcertExits;
module.exports.installCert = installCert;
module.exports.initMkcert = initMkcert;
