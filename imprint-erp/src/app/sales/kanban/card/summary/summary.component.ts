import {Component, Input, OnInit} from '@angular/core';
import {Card, CardInterface} from "../../../../shared/models/kanban-models/card/card";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.sass']
})
export class SummaryComponent implements OnInit {

  @Input() card: CardInterface;
  @Input() listIndex: number;
  @Input() cardIndex: number;

  constructor() { }

  ngOnInit() {
  }

  identifyCardBeingDragged(dragEvent: DragEvent) {
    dragEvent.dataTransfer.effectAllowed = 'move'
    dragEvent.dataTransfer.dropEffect= 'move'
    const transferObject = {
      'listIndex' : this.listIndex,
      'cardIndex' : this.cardIndex
    };
    dragEvent.dataTransfer.setData( 'text', JSON.stringify(transferObject));
  }

  allowCardDragToBeDropped(dragEvent: DragEvent) {
    dragEvent.dataTransfer.dropEffect= 'move'
    dragEvent.preventDefault();
  }

}
