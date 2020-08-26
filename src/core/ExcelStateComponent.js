import {ExcelComponent} from '@core/ExcelComponent';

export class ExcelStateComponent extends ExcelComponent {
  beforeInit() {
    this.state = {};
  }

  get template() {
    throw new Error('The getter "template" should be override!');
  }

  initState(initState) {
    this.state = {...initState};
  }

  setState(partialState) {
    this.state = {...this.state, ...partialState};
    this.$root.html(this.template);
  }
}
