// Simple event emitter for renderer process
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(...args));
    }
  }

  once(event, callback) {
    const onceWrapper = (...args) => {
      callback(...args);
      this.off(event, onceWrapper);
    };
    this.on(event, onceWrapper);
  }
}

const emitter = new EventEmitter();

export const fire = name => emitter.emit(name);
export const off = (name, callback) => emitter.off(name, callback);
export const on = (name, callback) => emitter.on(name, callback);
export const once = (name, callback) => emitter.once(name, callback);
