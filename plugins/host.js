/**
 * Created by lee on 2020/5/22 17:49
 */
const hostile = require('hostile');

class Host {
  constructor() {}
  apply(compiler) {
    compiler.hooks.host.tapAsync('set host', (callback) => {
      let arr = [];
      compiler.state.config.forEach((record) => {
        let p = new Promise((resolve, reject) => {
          hostile.set(record.to.domain, record.from.domain, function (err) {
            if (err) {
              reject(err);
              console.error(
                'Error: EACCES: permission denied, open /etc/hosts'
              );
            } else {
              resolve();
            }
          });

          process.on('exit', () => {
            hostile.remove(record.to.domain, record.from.domain, function (
              err
            ) {
              if (err) {
                console.error(err);
              } else {
                console.log('set /etc/hosts successfully!');
              }
            });
          });
        });

        arr.push(p);
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
  Host,
};
