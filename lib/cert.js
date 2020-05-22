/**
 * Created by lee on 2020/5/20 16:11
 */

const fs = require('fs');
const path = require('path');
const { isMkcertExits, installCert, initMkcert } = require('./cmd');
const cmd = require('./cmd');

class Cert {
  constructor(props = {}) {
    this.path = props.path || path.resolve('..', '_cert');
  }

  init() {
    return new Promise((resolve, reject) => {
      isMkcertExits()
        .then((res) => {
          initMkcert()
            .then((res) => {
              resolve(true);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  install(host) {
    return installCert({ host, path: this.path });
  }

  get(host) {
    if (!this.isExist(host)) return undefined;

    let keyPath = path.resolve(this.path, `${host}-key.pem`);
    let certPath = path.resolve(this.path, `${host}.pem`);
    return {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    };
  }

  isExist(host) {
    let exist = true;
    let keyPath = path.resolve(this.path, `${host}-key.pem`);
    let certPath = path.resolve(this.path, `${host}.pem`);

    if (!fs.existsSync(keyPath)) {
      exist = false;
    }
    if (!fs.existsSync(certPath)) {
      exist = false;
    }

    return exist;
  }
}

module.exports = new Cert({ path: path.resolve('.', '_cert') });
