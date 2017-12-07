let defaultProxy:ProxyHandler<ExtendableProxy> = {
  set: function(object: any, key, value, proxy) {
      object[key] = value;
      return true;
  }
}

export class ExtendableProxy {
  constructor(definition: ProxyHandler<any> = defaultProxy) {
      return new Proxy(this, definition);
  }
}