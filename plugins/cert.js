/**
 * Created by lee on 2020/5/22 17:33
 */
const cert = require('../lib/cert');

class Cert {
  constructor() {}

  apply(compiler) {
    compiler.hooks.cert.tapAsync('cert', (callback) => {
      // 检测并安装
      let config = compiler.state.config;

      let arr = [];
      config
        .filter((_) => _.from.port === 443)
        .map((_) => _.from.domain)
        .forEach((domain) => {
          if (!cert.isExist(domain)) {
            arr.push(cert.install(domain));
          }
        });

      Promise.all(arr)
        .then(() => {
          callback();
        })
        .catch((err) => {
          callback(err);
        });
    });
  }
}

module.exports = {
  Cert,
};
