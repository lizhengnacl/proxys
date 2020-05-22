/**
 * Created by lee on 2020/5/20 16:08
 */
const path = require('path');
const Compiler = require('./compiler');
const { ParseConfig, ReadConfig } = require('./plugins/config');
const { CheckRely } = require('./plugins/rely');
const { Cert } = require('./plugins/cert');
const { Host } = require('./plugins/host');
const { Mapping } = require('./plugins/mapping');

const options = {
  plugins: [
    new CheckRely(),
    new ParseConfig({
      filePath: path.resolve('.', 'config.md'),
    }),
    // new ReadConfig(),
    new Cert(),
    new Host(),
    new Mapping(),
  ],
};

let compiler = new Compiler(options);

compiler.run();
