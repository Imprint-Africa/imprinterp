import {Injectable} from "@angular/core";
import {Board} from "../../models/kanban-models/board/board";

export abstract class BoardService {
  public abstract saveBoard(board: Board );

  public abstract getBoard(): Board;
}
