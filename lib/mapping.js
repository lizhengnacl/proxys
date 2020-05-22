/**
 * Created by lee on 2020/5/20 16:15
 */
const httpProxy = require('http-proxy');
const cert = require('./cert');

class Mapping {
  constructor(props) {
    this.proxies = {};
    this.cert = props.cert;
  }

  _http(fromPort, toPort) {
    return new httpProxy.createProxyServer({
      target: `http://localhost:${toPort}`,
    }).listen(fromPort);
  }

  _https(fromPort, toPort, host) {
    return new httpProxy.createServer({
      target: {
        host: 'localhost',
        port: toPort,
      },
      ssl: this.cert.get(host),
    }).listen(fromPort);
  }

  _getKey(from, to) {
    return `${to}`;
  }

  _add(fromPort, toPort, host) {
    // https 443
    if (fromPort === 443) {
      return this._https(fromPort, toPort, host);
    } else {
      return this._http(fromPort, toPort);
    }
  }

  _remove(from, to) {
    let key = this._getKey(from, to);
    let proxy = this.proxies[key];
    if (proxy !== undefined) {
      proxy.close();
    }
  }

  add(from, to, host) {
    let key = this._getKey(from, to);
    let proxy = this.proxies[key];
    if (proxy === undefined) {
      // add
      proxy = this._add(from, to, host);
      this.proxies[key] = proxy;
    } else {
      // modify
      this._remove(from, to);
      proxy = this._add(from, to, host);
      this.proxies[key] = proxy;
    }
  }

  remove(from, to) {
    this._remove(from, to);
  }
}

module.exports = new Mapping({ cert });
