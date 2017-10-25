export class Embeddeb {
  static style = {
    width: '100%',
    height: '100%',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    position: 'fixed',
    zIndex: 2147483647,
    backgroundColor: '#FFFFFF'
  };
  static attribute = {
    frameBorder: 0,
    allowTransparency: 0
  };
  constructor(url) {
    this.state = 'inactive';
    this.iframe = null;
    this.url = url;
    this.origin = `chrome-extension://${chrome.runtime.id}`;
    this.style = { ...Embeddeb.style };
    this.attribute = { ...Embeddeb.attribute };
    this.events = {};
  }
  activate() {
    window.addEventListener('message', this.onmessage, true);
    if (this.state !== 'active') {
      this.state = 'active';
      this.iframe = document.createElement('iframe');
      Object.keys(this.style).forEach((key) => {
        this.iframe.style[key] = this.style[key];
      });
      Object.keys(this.attribute).forEach((key) => {
        this.iframe[key] = this.attribute[key];
      });
      this.iframe.src = this.url;
      document.body.appendChild(this.iframe);
      if (this.onactivate && typeof this.onactivate === 'function') {
        this.onactivate.call(this);
      }
    }
    return this;
  }
  deactivate() {
    this.state = 'inactive';
    window.removeEventListener('message', this.onmessage, true);
    if (this.iframe) {
      this.iframe.parentNode.removeChild(this.iframe);
      delete this.iframe;
    }
    if (this.ondeactivate && typeof this.ondeactivate === 'function') {
      this.ondeactivate.call(this);
    }
    return this;
  }
  onmessage = (event) => {
    const { data } = event;
    if (event.origin === this.origin && data.method) {
      if (this.state !== 'active') {
        return;
      }
      if (data.id) {
        this.emit(data.method, data.params, this.respond(data.id));
      } else {
        this.emit(event.method, data.params)
      }
    }
  }
  respond(id) {
    const context = this;
    return (result, error) => {
      context.iframe.contentWindow.postMessage({
        id,
        result,
        error: error && typeof error === 'object' ? error.toString() : error
      }, context.origin);
    }
  }
  emit(event, ...args) {
    let i, listeners;
    if (typeof this.events[event] === 'object') {
      listeners = this.events[event].slice();
      for (i = 0; i < listeners.length; i++) {
        listeners[i].apply(this, args);
      }
    }
    return this;
  }
  on(event, listener) {
    if (typeof this.events[event] !== 'object') {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return this;
  }
  off(event, listener) {
    let index;
    if (typeof this.events[event] === 'object') {
      index = this.events[event].indexOf(listener);
      if (index > -1) {
        this.events[event].splice(index, 1);
      }
    }
    return this;
  }
  clear() {
    this.events = [];
    return this;
  }
}
