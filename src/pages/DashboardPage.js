import {Page} from '@/pages/Page';
import {$} from '@core/Dom';

export class DashboardPage extends Page {
  getRoot() {
    this.context = $.create('div', 'db');
    return this.context.html(`
      <div class="db__header">
            <h1>Pure JS Excel</h1>
        </div>

        <div class="db__new">
            <div class="db__view">
                <a href="#" class="db__create">
                    <h1>New <br>Table</h1>
                </a>
            </div>
        </div>

        <div class="db__table db__view">
            <div class="db__list-header">
                <span>Name</span>
                <span>Updated</span>
            </div>

            <ul class="db__list">
                <li class="db__list-item">
                    <a href="#">Table #1</a>
                    <strong>12.12.12</strong>
                </li>
                <li class="db__list-item">
                    <a href="#">Table #2</a>
                    <strong>12.12.12</strong>
                </li>
            </ul>
        </div>
    `);
  }

  destroy() {
    this.context = null; // fixme
  }
}
