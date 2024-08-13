import { Color } from "../enums";
import { COLS, ROWS } from "../utils/constants";
import getPossibleOppositionMoves from "../utils/getPossibleOppositionMoves";
import Piece from "./Piece";
import Rock from "./Rock";

export default class King extends Piece {
  public isMoved: boolean = false;
  constructor(color: Color, image: string, position: number[]) {
    super(color, image, position);
  }
  public getPossibleMoves(board: (Piece | null)[][]): number[][] {
    const possibleMoves: number[][] = [];
    let rowIndex: number;
    let colIndex: number;
    let currentPiece: Piece | null;

    //#region check moves

    // Check top
    rowIndex = this.position[0] - 1;
    colIndex = this.position[1];
    if (rowIndex >= 0) {
      currentPiece = board[rowIndex][colIndex];
      if (!currentPiece || currentPiece?.color !== this.color)
        possibleMoves.push([rowIndex, colIndex]);
    }

    // Check top right
    rowIndex = this.position[0] - 1;
    colIndex = this.position[1] + 1;
    if (rowIndex >= 0 && colIndex < COLS) {
      currentPiece = board[rowIndex][colIndex];
      if (!currentPiece || currentPiece?.color !== this.color)
        possibleMoves.push([rowIndex, colIndex]);
    }

    // Check right
    rowIndex = this.position[0];
    colIndex = this.position[1] + 1;
    if (colIndex < COLS) {
      currentPiece = board[rowIndex][colIndex];
      if (!currentPiece || currentPiece?.color !== this.color)
        possibleMoves.push([rowIndex, colIndex]);
    }

    // Check bottom right
    rowIndex = this.position[0] + 1;
    colIndex = this.position[1] + 1;
    if (rowIndex < ROWS && colIndex < COLS) {
      currentPiece = board[rowIndex][colIndex];
      if (!currentPiece || currentPiece?.color !== this.color)
        possibleMoves.push([rowIndex, colIndex]);
    }

    // Check bottom left
    rowIndex = this.position[0] + 1;
    colIndex = this.position[1] - 1;
    if (rowIndex < ROWS && colIndex >= 0) {
      currentPiece = board[rowIndex][colIndex];
      if (!currentPiece || currentPiece?.color !== this.color)
        possibleMoves.push([rowIndex, colIndex]);
    }

    // Check bottom
    rowIndex = this.position[0] + 1;
    colIndex = this.position[1];
    if (rowIndex < ROWS) {
      currentPiece = board[rowIndex][colIndex];
      if (!currentPiece || currentPiece?.color !== this.color)
        possibleMoves.push([rowIndex, colIndex]);
    }

    // Check left
    rowIndex = this.position[0];
    colIndex = this.position[1] - 1;
    if (colIndex >= 0) {
      currentPiece = board[rowIndex][colIndex];
      if (!currentPiece || currentPiece?.color !== this.color)
        possibleMoves.push([rowIndex, colIndex]);
    }

    // Check top left
    rowIndex = this.position[0] - 1;
    colIndex = this.position[1] - 1;
    if (rowIndex >= 0 && colIndex >= 0) {
      currentPiece = board[rowIndex][colIndex];
      if (!currentPiece || currentPiece?.color !== this.color)
        possibleMoves.push([rowIndex, colIndex]);
    }

    //#endregion

    if (!this.isMoved) {
      // WHITE LONG CASTLE
      if (
        this.color === Color.WHITE &&
        board[ROWS - 1][0] instanceof Rock &&
        !(board[ROWS - 1][0] as Rock).isMoved &&
        board[ROWS - 1][1] === null &&
        board[ROWS - 1][2] === null &&
        board[ROWS - 1][3] === null
      ) {
        const protectedPositions: number[][] = [
          this.position,
          [this.position[0], this.position[1] - 1],
          [this.position[0], this.position[1] - 2],
        ];

        const possibleOppositionMoves: number[][][] =
          getPossibleOppositionMoves(board, this.color);

        let isValid: boolean = true;
        for (const row of possibleOppositionMoves) {
          for (const move of row) {
            const checkedMove: number[] | undefined = protectedPositions.find(
              position => position[0] === move[0] && position[1] === move[1]
            );
            if (checkedMove !== undefined) {
              isValid = false;
            }
          }
        }
        if (isValid) possibleMoves.push([ROWS - 1, 0]);
      }

      // WHITE SHORT CASTLE
      if (
        this.color === Color.WHITE &&
        board[ROWS - 1][COLS - 1] instanceof Rock &&
        !(board[ROWS - 1][COLS - 1] as Rock).isMoved &&
        board[ROWS - 1][COLS - 2] === null &&
        board[ROWS - 1][COLS - 3] === null
      ) {
        const protectedPositions: number[][] = [
          this.position,
          [this.position[0], this.position[1] + 1],
          [this.position[0], this.position[1] + 2],
        ];

        const possibleOppositionMoves: number[][][] =
          getPossibleOppositionMoves(board, this.color);

        let isValid: boolean = true;
        for (const row of possibleOppositionMoves) {
          for (const move of row) {
            const checkedMove: number[] | undefined = protectedPositions.find(
              position => position[0] === move[0] && position[1] === move[1]
            );
            if (checkedMove !== undefined) {
              isValid = false;
            }
          }
        }
        if (isValid) possibleMoves.push([ROWS - 1, COLS - 1]);
      }

      // BLACK LONG CASTLE
      if (
        this.color === Color.BLACK &&
        board[0][0] instanceof Rock &&
        !(board[0][0] as Rock).isMoved &&
        board[0][1] === null &&
        board[0][2] === null &&
        board[0][3] === null
      ) {
        const protectedPositions: number[][] = [
          this.position,
          [this.position[0], this.position[1] - 1],
          [this.position[0], this.position[1] - 2],
        ];

        const possibleOppositionMoves: number[][][] =
          getPossibleOppositionMoves(board, this.color);

        let isValid: boolean = true;
        for (const row of possibleOppositionMoves) {
          for (const move of row) {
            const checkedMove: number[] | undefined = protectedPositions.find(
              position => position[0] === move[0] && position[1] === move[1]
            );
            if (checkedMove !== undefined) {
              isValid = false;
            }
          }
        }
        if (isValid) possibleMoves.push([0, 0]);
      }

      // BLACK SHORT CASTLE
      if (
        this.color === Color.BLACK &&
        board[0][COLS - 1] instanceof Rock &&
        !(board[0][COLS - 1] as Rock).isMoved &&
        board[0][COLS - 2] === null &&
        board[0][COLS - 3] === null
      ) {
        const protectedPositions: number[][] = [
          this.position,
          [this.position[0], this.position[1] + 1],
          [this.position[0], this.position[1] + 2],
        ];

        const possibleOppositionMoves: number[][][] =
          getPossibleOppositionMoves(board, this.color);

        let isValid: boolean = true;
        for (const row of possibleOppositionMoves) {
          for (const move of row) {
            const checkedMove: number[] | undefined = protectedPositions.find(
              position => position[0] === move[0] && position[1] === move[1]
            );
            if (checkedMove !== undefined) {
              isValid = false;
            }
          }
        }
        if (isValid) possibleMoves.push([0, COLS - 1]);
      }
    }

    return possibleMoves;
  }
  public override moveToSquare = (
    board: (Piece | null)[][],
    position: number[]
  ): (Piece | null)[][] => {
    // Create a copy of board
    const newBoard: (Piece | null)[][] = [...board];

    // White king long castle
    if (position[0] === ROWS - 1 && position[1] === 0 && !this.isMoved) {
      newBoard[this.position[0]][this.position[1]] = null;
      this.position = [ROWS - 1, 2];
      newBoard[ROWS - 1][2] = this;
      this.isMoved = true;

      const rock: Rock = newBoard[ROWS - 1][0] as Rock;
      rock.position = [ROWS - 1, 3];
      newBoard[ROWS - 1][3] = rock;
      newBoard[ROWS - 1][0] = null;
      rock.isMoved = true;
      return newBoard;
    }

    // White king short castle
    if (position[0] === ROWS - 1 && position[1] === COLS - 1 && !this.isMoved) {
      newBoard[this.position[0]][this.position[1]] = null;
      this.position = [ROWS - 1, COLS - 2];
      newBoard[ROWS - 1][COLS - 2] = this;
      this.isMoved = true;

      const rock: Rock = newBoard[ROWS - 1][COLS - 1] as Rock;
      rock.position = [ROWS - 1, COLS - 3];
      newBoard[ROWS - 1][COLS - 3] = rock;
      newBoard[ROWS - 1][COLS - 1] = null;
      rock.isMoved = true;
      return newBoard;
    }

    // Black king long castle
    if (position[0] === 0 && position[1] === 0 && !this.isMoved) {
      newBoard[this.position[0]][this.position[1]] = null;
      this.position = [0, 2];
      newBoard[0][2] = this;
      this.isMoved = true;

      const rock: Rock = newBoard[0][0] as Rock;
      rock.position = [0, 3];
      newBoard[0][3] = rock;
      newBoard[0][0] = null;
      rock.isMoved = true;
      return newBoard;
    }

    // Black king short castle
    if (position[0] === 0 && position[1] === COLS - 1 && !this.isMoved) {
      newBoard[this.position[0]][this.position[1]] = null;
      this.position = [0, COLS - 2];
      newBoard[0][COLS - 2] = this;
      this.isMoved = true;

      const rock: Rock = newBoard[0][COLS - 1] as Rock;
      rock.position = [0, COLS - 3];
      newBoard[0][COLS - 3] = rock;
      newBoard[0][COLS - 1] = null;
      rock.isMoved = true;
      return newBoard;
    }

    // Remove piece from the previous position
    newBoard[this.position[0]][this.position[1]] = null;

    // Add piece to the new position
    this.position = position;
    newBoard[position[0]][position[1]] = this;

    this.isMoved = true;
    return newBoard;
  };
}
