/**
 * Created by lee on 2020/5/22 15:15
 */

const { AsyncSeriesHook } = require('tapable');

class Compiler {
  constructor(options) {
    this.state = {};
    this.hooks = {
      config: new AsyncSeriesHook(),
      rely: new AsyncSeriesHook(),
      cert: new AsyncSeriesHook(),
      host: new AsyncSeriesHook(),
      mapping: new AsyncSeriesHook(),
    };

    let plugins = options.plugins;
    if (plugins && plugins.length > 0) {
      plugins.forEach((plugin) => plugin.apply(this));
    }
  }
  run() {
    console.log('========== loading... ==========');
    this.rely(() => {
      this.config(() => {
        this.cert(() => {
          this.host(() => {
            this.mapping(() => {
              console.log('========== loaded     ==========');
            });
          });
        })
      });
    });
  }

  config(callback) {
    this.hooks.config.callAsync((err) => {
      if (!err) {
        callback && callback();
      }
    });
  }

  rely(callback) {
    this.hooks.rely.callAsync((err) => {
      if (!err) {
        callback && callback();
      }
    });
  }

  cert(callback) {
    this.hooks.cert.callAsync((err) => {
      if (!err) {
        callback && callback();
      }
    });
  }

  host(callback) {
    this.hooks.host.callAsync((err) => {
      if (!err) {
        callback && callback();
      }
    });
  }

  mapping(callback) {
    this.hooks.mapping.callAsync((err) => {
      if (!err) {
        callback && callback();
      }
    });
  }
}

module.exports = Compiler;
