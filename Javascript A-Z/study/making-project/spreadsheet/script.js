const spreadSheetContainer = document.querySelector('#spreadsheet-container');
const exportBtn = document.querySelector('#export-btn');
const ROWS = 10;
const COLS = 10;
const spreadsheet = [];
const alphabets = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

//* 객체 데이터 생성
class Cell {
  constructor(
    isHeader,
    disabled,
    data,
    row,
    column,
    rowName,
    columnName,
    active = false,
  ) {
    this.isHeader = isHeader;
    this.disabled = disabled;
    this.data = data;
    this.row = row;
    this.column = column;
    this.rowName = rowName;
    this.columnName = columnName;
    this.active = active;
  }
}

//* 기본 데이터 생성
function initSpreadsheet() {
  for (let i = 0; i < ROWS; i++) {
    let spreadsheetRow = [];
    for (let j = 0; j < COLS; j++) {
      let cellData = '';
      let isHeader = false;
      let disabled = false;

      // 모든 row 첫 번째 컬럼에 숫자 넣기
      if (j === 0) {
        cellData = i;
        isHeader = true;
        disabled = true;
      }

      // 첫번째 row에 알파벳 넣기
      if (i === 0) {
        cellData = alphabets[j - 1];
        isHeader = true;
        disabled = true;
      }
      // cellData가 undefined면 ""
      if (!cellData) {
        cellData = '';
      }

      const rowName = i;
      const columnName = alphabets[j - 1];

      const cell = new Cell(
        isHeader,
        disabled,
        cellData,
        i,
        j,
        rowName,
        columnName,
        false,
      );
      spreadsheetRow.push(cell);
    }
    spreadsheet.push(spreadsheetRow);
  }
  drawSheet();
  console.log('spreadsheet', spreadsheet);
}

//* cell elemnet 생성
function createCellEl(cell) {
  const cellEl = document.createElement('input');
  cellEl.className = 'cell';
  cellEl.id = `cell_${cell.row}${cell.column}`;
  cellEl.value = cell.data;
  cellEl.disabled = cell.disabled;

  if (cell.isHeader) {
    cellEl.classList.add('header');
  }

  cellEl.onclick = () => handleCellClick(cell);
  cellEl.onchange = (event) => handleOnChange(event.target.value, cell);

  return cellEl;
}

//* cell 클릭 이벤트
function handleCellClick(cell) {
  clearHeaderActiveStates();
  const columnHeader = spreadsheet[0][cell.column];
  const rowHeader = spreadsheet[cell.row][0];
  const columnHeaderEl = getElFromRowCol(columnHeader.row, columnHeader.column);
  const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.column);
  columnHeaderEl.classList.add('active');
  rowHeaderEl.classList.add('active');
  document.querySelector(
    '#cell-status',
  ).innerHTML = `${cell.columnName}${cell.rowName}`;
}

function getElFromRowCol(row, col) {
  return document.querySelector(`#cell_${row}${col}`);
}

//* cell에 입력시 data 넣어주기
function handleOnChange(data, cell) {
  cell.data = data;
}

//* 헤더 하이라이트 제거
function clearHeaderActiveStates() {
  const headers = document.querySelectorAll('.header');

  headers.forEach((header) => {
    header.classList.remove('active');
  });
}

//* cell 렌더링
function drawSheet() {
  for (let i = 0; i < spreadsheet.length; i++) {
    for (let j = 0; j < spreadsheet[i].length; j++) {
      const cell = spreadsheet[i][j];
      spreadSheetContainer.append(createCellEl(cell));
    }
  }
}

//* export 버튼 클릭 이벤트
exportBtn.onclick = function (event) {
  let csv = '';
  for (let i = 0; i < spreadsheet.length; i++) {
    if (i === 0) continue;
    //* header 제외, cell에서 data 추출 후 ','을 달아 주고 마지막에 CRLF
    csv +=
      spreadsheet[i]
        .filter((item) => !item.isHeader)
        .map((item) => item.data)
        .join(',') + '\r\n';
  }

  // 이미지, 비디오 같은 데이터를 Blob 객체로 변환
  const csvObj = new Blob([csv]);
  // blob으로 변환한 객체를 URL 생성
  const csvUrl = URL.createObjectURL(csvObj);
  console.log('csv', csvUrl);
  const a = document.createElement('a');
  a.href = csvUrl;
  a.download = 'Spreadsheet File Name.csv';
  a.click();
};

initSpreadsheet();
