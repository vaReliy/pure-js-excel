export function State() {
  return {
    table: new TableState(),
    header: {
      title: '',
    },
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
