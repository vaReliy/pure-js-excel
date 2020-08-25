export function createHeader(title) {
  return `
    <input
        class="input"
        id="header"
        type="text"
        placeholder="New table"
        value="${title || ''}">

    <div class="buttons">
        <div class="button">
            <i class="material-icons">delete</i>
        </div>

        <div class="button">
            <i class="material-icons">exit_to_app</i>
        </div>
    </div>
  `;
}
