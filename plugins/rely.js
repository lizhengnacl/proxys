/**
 * Created by lee on 2020/5/22 17:03
 */

const { isMkcertExits } = require('../lib/cmd');
class CheckRely {
  constructor() {}

  apply(compiler) {
    compiler.hooks.rely.tapAsync('check rely', (callback) => {
      isMkcertExits()
        .then(() => {
          callback();
        })
        .catch((err) => {
          callback(err);
          console.error('请正确安装 mkcert: http://mkcert.dev/');
          console.error('brew install mkcert');
          console.error('mkcert -install');
        });
    });
  }
}

module.exports = {
  CheckRely,
};
