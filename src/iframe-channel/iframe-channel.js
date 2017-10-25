import { v4 } from 'uuid';

export class IframeChannel {
  static request (method, params) {
    return {
      id: v4(),
      method,
      params
    }
  }
  constructor() {
    this.callbacks = new Map();
    window.addEventListener('message', this.onmessage, false);
  }
  onmessage = (event) => {
    const { data } = event;
    let callback; 
    if (data && data.id && this.callbacks.has(data.id)) {
      callback = this.callbacks.get(data.id);
      this.callbacks.delete(data.id);
      callback(data.result, data.error);
    }
  }
  call(request, callback) {
    this.callbacks.set(request.id, callback); 
    window.parent.postMessage(request, '*');
    return this;
  }
  abort(id) {
    return this.callbacks.delete(id);
  }
  close() {
    this.callback.clear();
    window.removeEventListener('message', this.onmessage);
  }
}
