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
      const target = state.table; // fixme!!!
      Object.keys(target).forEach(key => {
        if (!isEqual(this.prevState.table[key], target[key])) {
          components.forEach(component => {
            if (component.isWatching(key)) {
              component.$onStoreChanges({[key]: target[key]});
            }
          });
        }
      });
      this.prevState = this.store.getState();
    });
  }

  unsubscribeComponents() {
    this.unsubscriber.unsubscribe();
  }
}
