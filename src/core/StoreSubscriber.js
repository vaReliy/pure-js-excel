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
      // eslint-disable-next-line max-len
      const rootStateKeys = ['table']; // todo: add other states: toolbar, header, formula
      rootStateKeys.forEach(rootKey => {
        detectChanges(state[rootKey], this.prevState[rootKey], components);
      });
      this.prevState = this.store.getState();
    });
  }

  unsubscribeComponents() {
    this.unsubscriber.unsubscribe();
  }
}

function detectChanges(state, prevState, components) {
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
