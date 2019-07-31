import { Component, OnInit } from '@angular/core';
import {List, ListInterface} from "../../../shared/models/kanban-models/list/list";
import {LocalService} from "../../../shared/services/kanbanservices/local/local.service";
import {MovementIntf} from "../../../shared/models/kanban-models/card/movement";
import {Board} from "../../../shared/models/kanban-models/board/board";
import {BoardService} from "../../../shared/services/kanbanservices/board-service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {

  lists: ListInterface[];

  constructor(private localService : LocalService) { }

  ngOnInit() {
    const board = this.localService.getBoard();
    this.lists = board.lists || [];
  }
  addList() {
    const newList: ListInterface = new List();
    newList.position = this.lists.length + 1;
    newList.name = `List #${newList.position}`;
    if (this.lists === undefined) {
      this.lists = [];
    }
    this.lists.push(newList);
  }

  moveCardAcrossList(movementInformation: MovementIntf) {
    const cardMoved = this.lists[movementInformation.fromListIdx].cards.splice(movementInformation.fromCardIdx, 1);
    this.lists[movementInformation.toListIdx].cards.splice(movementInformation.toCardIdx , 0 , ...cardMoved);
  }

  saveBoard() {
    const boardModel = new Board();
    boardModel.lists = this.lists;
    this.localService.saveBoard(boardModel);
  }
  deleteList(listIndex: number){
    this.lists.splice(listIndex,1);
  }


}
