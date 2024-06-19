import { Color, Direction } from "../enums";

import IPiece from "../interfaces/IPiece";

export default abstract class Piece implements IPiece {
  color: Color;
  image: string;
  position: number[];
  direction: Direction;

  constructor(color: Color, image: string, position: number[]) {
    this.color = color;
    this.image = image;
    this.position = position;
    this.direction = color === Color.BLACK ? Direction.DOWN : Direction.UP;
  }

  getPossibleMoves = (board: Piece[][]): number[][] => [];

  getAllMoves = (board: Piece[][]): number[][] => [];
}
