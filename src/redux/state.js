export function State() {
  return {
    table: new TableState(),
  };
}

export function TableState() {
  return {
    size: {
      col: {},
      row: {},
    },
    styleData: {},
    cellData: {},
    currentTextContent: {},
  };
}
