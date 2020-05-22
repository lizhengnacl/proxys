/**
 * Created by lee on 2020/5/22 22:00
 */

const mapping = require('../lib/mapping');

class Mapping {
  constructor() {}

  apply(compiler) {
    compiler.hooks.mapping.tapAsync('mapping', (callback) => {
      let config = compiler.state.config;
      config.forEach((record) => {
        mapping.add(record.from.port, record.to.port, record.from.domain);
      });

      callback();
    });
  }
}

module.exports = {
  Mapping,
};
