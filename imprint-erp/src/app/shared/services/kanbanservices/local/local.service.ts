import { Injectable } from '@angular/core';
import {BoardService} from "../board-service";
import {Board} from "../../../models/kanban-models/board/board";

@Injectable({
  providedIn: 'root'
})
export class LocalService extends BoardService{
  public saveBoard(board: Board) {
    localStorage.setItem('board', JSON.stringify(board));
  }
  public getBoard(): Board {
    const item =localStorage.getItem('board');
    return JSON.parse(item ||'{}')
  }

}
