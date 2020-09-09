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
  return keyList.length ? templateList(keyList) : templateNoResults();
}

function templateNoResults() {
  return `
    <div class="db__list-header">
        <p>No table was created yet.</p>
    </div>
  `;
}

function templateList(list) {
  return `
    <div class="db__list-header">
        <span>Name</span>
        <span>Updated</span>
    </div>

    <ul class="db__list">
        ${buildList(keysToList(list))}
    </ul>
  `;
}

function keysToList(keyList) {
  const list = [];
  keyList.forEach(key => {
    const id = key.split(':')[1];
    const {title, updatedAt} = storage(key);
    list.push({id, title, updatedAt});
  });

  const sortByUpdatedAt = (a, b) => {
    return b.updatedAt - a.updatedAt;
  };
  return list.sort(sortByUpdatedAt);
}

function buildList(list) {
  let result = '';
  list.forEach(item => {
    const {id, title, updatedAt} = item;
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
