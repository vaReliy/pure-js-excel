export function createHeader(state) {
  const meta = 'data-type="button"';
  return `
    <input
        class="input"
        type="text"
        placeholder="New table"
        value="${state.title || ''}">

    <div class="buttons">
        <div class="button" ${meta}>
            <i class="material-icons" ${meta}>delete</i>
        </div>

        <div class="button">
            <a href="#dashboard"><i class="material-icons">exit_to_app</i></a>
        </div>
    </div>
  `;
}
