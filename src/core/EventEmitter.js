export class EventEmitter {
  constructor() {
    this.listeners = [];
  }

  subscribe(eventType, handler) {
    this.listeners[eventType] = this.listeners[eventType] || [];
    this.listeners[eventType].push(handler);

    return () => {
      this.listeners[eventType] = this.listeners[eventType]
          .filter(h => h !== handler);
    };
  }

  unsubscribe(eventType, handler) {
    this.listeners[eventType] = this.listeners[eventType]
        .filter(h => h !== handler);
  }

  emit(eventType, ...args) {
    if (!Array.isArray(this.listeners[eventType])) {
      return;
    }
    this.listeners[eventType].forEach(listener => {
      listener(...args);
    });
  }
}
