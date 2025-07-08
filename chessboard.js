const board = document.getElementById("chessboard");
const turnDisplay = document.getElementById("turnDisplay");
const pieceOrder = ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"];

let currentTurn = "lavender";
let selectedCell = null;

function isWhitePiece(piece) {
  return ["♙", "♖", "♘", "♗", "♕", "♔"].includes(piece);
}

function isBlackPiece(piece) {
  return ["♟", "♜", "♞", "♝", "♛", "♚"].includes(piece);
}

function getCell(row, col) {
  return document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
}

function isPathClear(fromRow, fromCol, toRow, toCol) {
  const rowStep = Math.sign(toRow - fromRow);
  const colStep = Math.sign(toCol - fromCol);
  let row = fromRow + rowStep;
  let col = fromCol + colStep;
  while (row !== toRow || col !== toCol) {
    const cell = getCell(row, col);
    if (cell && cell.textContent !== "") return false;
    row += rowStep;
    col += colStep;
  }
  return true;
}

function isValidMove(piece, fromRow, fromCol, toRow, toCol) {
  const deltaRow = toRow - fromRow;
  const deltaCol = toCol - fromCol;
  const absRow = Math.abs(deltaRow);
  const absCol = Math.abs(deltaCol);
  const targetCell = getCell(toRow, toCol);
  const targetPiece = targetCell?.textContent;
  const isWhite = isWhitePiece(piece);
  const isCapture = targetPiece && ((isWhite && isBlackPiece(targetPiece)) || (!isWhite && isWhitePiece(targetPiece)));

  switch (piece) {
    case '♙': 
      if (deltaCol === 0 && deltaRow === -1 && !targetPiece) return true;
      if (fromRow === 6 && deltaCol === 0 && deltaRow === -2 && !targetPiece && getCell(5, fromCol).textContent === '') return true;
      if (absCol === 1 && deltaRow === -1 && isCapture) return true;
      break;
    case '♟': 
      if (deltaCol === 0 && deltaRow === 1 && !targetPiece) return true;
      if (fromRow === 1 && deltaCol === 0 && deltaRow === 2 && !targetPiece && getCell(2, fromCol).textContent === '') return true;
      if (absCol === 1 && deltaRow === 1 && isCapture) return true;
      break;
    case '♖':
    case '♜':
      if ((deltaRow === 0 || deltaCol === 0) && isPathClear(fromRow, fromCol, toRow, toCol)) return true;
      break;
    case '♗':
    case '♝':
      if (absRow === absCol && isPathClear(fromRow, fromCol, toRow, toCol)) return true;
      break;
    case '♕':
    case '♛':
      if ((absRow === absCol || deltaRow === 0 || deltaCol === 0) && isPathClear(fromRow, fromCol, toRow, toCol)) return true;
      break;
    case '♘':
    case '♞':
      if ((absRow === 2 && absCol === 1) || (absRow === 1 && absCol === 2)) return true;
      break;
    case '♔':
    case '♚':
      if (absRow <= 1 && absCol <= 1) return true;
      break;
  }
  return false;
}

function setPiece(cell, piece) {
  cell.textContent = piece;
  cell.style.color = "";

  if (!piece) return;
  const isDark = cell.classList.contains("wisteria");

  if (isWhitePiece(piece)) {
    cell.style.color = isDark ? "#CBC3E3" : "#CCCCFF";
  } else if (isBlackPiece(piece)) {
    cell.style.color = isDark ? "#CCCCFF" : "#CBC3E3";
  }
}

function createCell(row, col) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.classList.add((row + col) % 2 === 0 ? "lavender" : "wisteria");
  cell.dataset.row = row;
  cell.dataset.col = col;

  if (row === 0) setPiece(cell, pieceOrder[col].replace("♖", "♜").replace("♘", "♞").replace("♗", "♝").replace("♕", "♛").replace("♔", "♚"));
  else if (row === 1) setPiece(cell, "♟");
  else if (row === 6) setPiece(cell, "♙");
  else if (row === 7) setPiece(cell, pieceOrder[col]);

  cell.addEventListener("click", () => handleCellClick(cell));
  board.appendChild(cell);
}

function handleCellClick(cell) {
  const piece = cell.textContent;

  if (selectedCell) {
    if (cell === selectedCell) {
      selectedCell.classList.remove("selected");
      selectedCell = null;
      return;
    }

    const movingPiece = selectedCell.textContent;
    const isWhiteMove = currentTurn === "lavender";
    const fromRow = parseInt(selectedCell.dataset.row);
    const fromCol = parseInt(selectedCell.dataset.col);
    const toRow = parseInt(cell.dataset.row);
    const toCol = parseInt(cell.dataset.col);

    if (
      (!piece || (isWhiteMove && isBlackPiece(piece)) || (!isWhiteMove && isWhitePiece(piece))) &&
      isValidMove(movingPiece, fromRow, fromCol, toRow, toCol)
    ) {
      setPiece(cell, movingPiece);
      setPiece(selectedCell, "");
      selectedCell.classList.remove("selected");
      selectedCell = null;

      currentTurn = currentTurn === "lavender" ? "wisteria" : "lavender";
      turnDisplay.textContent = currentTurn.charAt(0).toUpperCase() + currentTurn.slice(1);
    } else {
      selectedCell.classList.remove("selected");
      selectedCell = null;
    }
  } else {
    if ((currentTurn === "lavender" && isWhitePiece(piece)) || (currentTurn === "wisteria" && isBlackPiece(piece))) {
      selectedCell = cell;
      cell.classList.add("selected");
    }
  }
}

for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    createCell(row, col);
  }
}
