export function createHeader(state) {
  return `
    <input
        class="input"
        type="text"
        placeholder="New table"
        value="${state.title || ''}">

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
