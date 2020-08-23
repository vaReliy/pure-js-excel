export class Store {
  /**
   * @param {Function} rootReducer
   * @param {State} initialState
   */
  constructor(rootReducer, initialState) {
    /** @type Function */
    this.reducer = rootReducer.bind(this);
    this.state = this.reducer(initialState, {type: '__INIT__'});
    /** @type Array<Function> */
    this.listeners = [];
  }

  subscribe(handler) {
    this.listeners.push(handler);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== handler);
    };
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.listeners.forEach(listener => listener(this.state));
  }

  /** @return {State} */
  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }
}
