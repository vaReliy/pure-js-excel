import {isEqual} from '@/utils/utils';

export class StoreSubscriber {
  constructor(store) {
    this.store = store;
    this.prevState = {};
    this.unsubscriber = null;
  }

  subscribeComponents(components) {
    this.prevState = this.store.getState();

    this.unsubscriber = this.store.subscribe(state => {
      detectChanges(state, this.prevState, components);
      this.prevState = this.store.getState();
    });
  }

  unsubscribeComponents() {
    this.unsubscriber();
  }
}

function detectChanges(state, prevState, components) {
  if (!state) {
    return;
  }
  Object.keys(state).forEach(key => {
    if (!isEqual(prevState[key], state[key])) {
      components.forEach(component => {
        if (component.isWatching(key)) {
          component.$onStoreChanges({[key]: state[key]});
        }
      });
    }
  });
}
