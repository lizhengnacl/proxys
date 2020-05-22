/**
 * Created by lee on 2020/5/22 15:14
 */

const { readFileSync } = require('fs');

function parseLine(str) {
  let res = str
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map((_) => _.split(':'));
  return {
    from: {
      domain: res[1][0],
      port: Number(res[1][1] || 80),
    },
    to: {
      domain: res[0][0],
      port: Number(res[0][1]),
    },
  };
}

class ParseConfig {
  constructor({ filePath }) {
    this.filePath = filePath;
  }

  apply(compiler) {
    compiler.hooks.config.tapAsync('parse config', (callback) => {
      let data = readFileSync(this.filePath);

      let arr = data
        .toString()
        .split('\n')
        .filter((_) => !(_.indexOf('#') === 0 || _ === ''));
      compiler.state.config = arr.map(parseLine);
      callback();
    });
  }
}

class ReadConfig {
  constructor() {}

  apply(compiler) {
    compiler.hooks.config.tapAsync('read config', (callback) => {
      setTimeout(() => {
        callback();
        console.log(
          '========== config ==========\n',
          JSON.stringify(compiler.state.config, null, 4)
        );
      }, 100);
    });
  }
}

module.exports = {
  ParseConfig,
  ReadConfig,
};
