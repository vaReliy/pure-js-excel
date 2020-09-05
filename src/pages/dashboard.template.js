import {findStorageKeysBy, storage} from '@/utils/utils';

export function dashboardToHTML() {
  const now = Date.now().toString();
  return `
      <div class="db__header">
            <h1>Pure JS Excel</h1>
        </div>

        <div class="db__new">
            <div class="db__view">
                <a href="#excel/${now}" class="db__create">
                    <h1>New <br>Table</h1>
                </a>
            </div>
        </div>

        <div class="db__table db__view">
            ${buildTableList()}
        </div>
    `;
}

function buildTableList() {
  const keyList = findStorageKeysBy('excel:');
  const noResults = `
    <div class="db__list-header">
        <p>No table was created yet.</p>
    </div>
  `;

  const template = list => `
    <div class="db__list-header">
        <span>Name</span>
        <span>Updated</span>
    </div>

    <ul class="db__list">
        ${buildList(list)}
    </ul>
  `;

  return keyList.length ? template(keyList) : noResults;
}

function buildList(keyList) {
  let result = '';
  keyList.forEach(key => {
    const id = key.split(':')[1];
    const {title, updatedAt} = storage(key);
    result += buildTableLi(id, title, updatedAt);
  });
  return result;
}

function buildTableLi(id, name, date) {
  return `
    <li class="db__list-item">
        <a href="#excel/${id}">${name || 'no title'}</a>
        <strong>${(new Date(date)).toLocaleString('Uk-uk')}</strong>
    </li>
  `;
}
