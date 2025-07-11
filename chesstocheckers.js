const board = document.getElementById("checkers");
const turnDisplay = document.getElementById("turnDisplay");

let currentTurn = "lavender";
let selectedCell = null;

function getPieceType(cell) {
  return cell.getAttribute("data-piece");
}

// Lavender pieces are white, Wisteria pieces are black
function isWhitePiece(cell) {
  const piece = getPieceType(cell);
  return piece === "⚪" || piece === "👑⚪";
}

function isBlackPiece(cell) {
  const piece = getPieceType(cell);
  return piece === "🟣" || piece === "👑🟣";
}

function getCell(row, col) {
  return document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
}

// Move the piece to the target cell if the path is clear
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

// Checks if move is valid
// A valid move is one that is either a standard move or a jump move
function isValidMove(piece, fromRow, fromCol, toRow, toCol) {
  const deltaRow = toRow - fromRow;
  const deltaCol = toCol - fromCol;
  const absRow = Math.abs(deltaRow);
  const absCol = Math.abs(deltaCol);

  const targetCell = getCell(toRow, toCol);
  if (cellHasPiece(targetCell)) return false;

  const middleRow = fromRow + deltaRow / 2;
  const middleCol = fromCol + deltaCol / 2;
  const jumpedCell = getCell(middleRow, middleCol);

  const isLavender = piece === "⚪" || piece === "👑⚪";
  const isWisteria = piece === "🟣" || piece === "👑🟣";
  const isKing = piece.includes("👑");

// Standard move
  if (
  absRow === 1 &&
  absCol === 1 &&
  (
    (isLavender && (deltaRow === -1 || isKing)) ||
    (isWisteria && (deltaRow === 1 || isKing))
  )
) {
  return true;
}

// Jump move
if (
  absRow === 2 &&
  absCol === 2 &&
  jumpedCell &&
  cellHasPiece(jumpedCell) &&
  (
    (isLavender && (deltaRow === -2 || isKing) && isBlackPiece(jumpedCell)) ||
    (isWisteria && (deltaRow === 2 || isKing) && isWhitePiece(jumpedCell))
  )
) {
  return true; // Valid jump move
}

  return false; // Invalid move
}

function setPiece(cell, piece) {
  cell.innerHTML = "";
  cell.removeAttribute("data-piece"); // reset

  if (!piece) return;

  const icon = document.createElement("i");
  icon.classList.add("fas");

  if (piece === "⚪") {
    icon.classList.add("fa-circle", "lavender-piece");
    cell.setAttribute("data-piece", "⚪");
  } else if (piece === "🟣") {
    icon.classList.add("fa-circle", "wisteria-piece");
    cell.setAttribute("data-piece", "🟣");
  } else if (piece === "👑⚪") {
    icon.classList.add("fa-chess-king", "lavender-piece", "king-piece");
    cell.setAttribute("data-piece", "👑⚪");
  } else if (piece === "👑🟣") {
    icon.classList.add("fa-chess-king", "wisteria-piece", "king-piece");
    cell.setAttribute("data-piece", "👑🟣");
  }

  cell.appendChild(icon);
}

// Creates a cell in the checkerboard
// Each cell is a div with a class of "cell"
function createCell(row, col) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    const isDark = (row + col ) % 2 !== 0;
    cell.classList.add(isDark ? "wisteria" : "lavender");
    cell.dataset.row = row;
    cell.dataset.col = col;

    if (isDark && row < 3) {
        setPiece(cell,"🟣" ); //Wisteria Piece
    } else if (isDark && row > 4){
        setPiece(cell, "⚪"); //Lavender Piece
    }

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

    const movingPiece = getPieceType(selectedCell);
    const isWhiteMove = currentTurn === "lavender";
    const fromRow = parseInt(selectedCell.dataset.row);
    const fromCol = parseInt(selectedCell.dataset.col);
    const toRow = parseInt(cell.dataset.row);
    const toCol = parseInt(cell.dataset.col);

    if (
      (!cellHasPiece(cell) || (isWhiteMove && isBlackPiece(cell)) || (!isWhiteMove && isWhitePiece(cell))) &&
      isValidMove(movingPiece, fromRow, fromCol, toRow, toCol)
    ) {
      setPiece(cell, movingPiece); //Moves the piece to target cell
      if (movingPiece === "⚪" && toRow === 0) {
        setPiece(cell, "👑⚪"); // Changes to King
      } else if (movingPiece === "🟣" && toRow === 7){
        setPiece(cell, "👑🟣"); // Changes to King
      }
      if(Math.abs(toRow - fromRow) === 2 && Math.abs(toCol - fromCol) === 2) {
        const capturedRow = (fromRow + toRow) / 2;
        const capturedCol = (fromCol + toCol) / 2;
        const capturedCell = getCell(capturedRow, capturedCol);
        setPiece(capturedCell, ""); // Removes the captured piece
      }
      
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
    if ((currentTurn === "lavender" && isWhitePiece(cell)) || (currentTurn === "wisteria" && isBlackPiece(cell))) {
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
// Checks if a cell has a piece
// A cell has a piece if it contains a piece (either lavender or wisteria)
function cellHasPiece(cell) {
  return cell.querySelector("i") !== null;
}
