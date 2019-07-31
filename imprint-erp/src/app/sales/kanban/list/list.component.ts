import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {ListInterface} from "../../../shared/models/kanban-models/list/list";
import {Movement, MovementIntf} from "../../../shared/models/kanban-models/card/movement";
import {Card, CardInterface} from "../../../shared/models/kanban-models/card/card";
import {DOCUMENT} from "@angular/common";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  @Input() list: ListInterface;
  @Input() card: CardInterface;
  @Input() listIndex: number;
  @Output() moveCardAcrossList: EventEmitter<MovementIntf> = new EventEmitter<MovementIntf>();
  @Output() newCardAdded: EventEmitter<Card> = new EventEmitter<CardInterface>();
  @Output() deleteList: EventEmitter<number> = new EventEmitter<number>();

  private cardCount = 0;


  constructor(private elementRef: ElementRef , @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
  }
  addNewCard() {
    const card = new Card(this.cardCount++ + '', 'header' + this.cardCount, 'summary' + this.cardCount, 'sample desc');
    this.list.cards.push(card);
    this.newCardAdded.emit(card);
  }


  allowCardReplacement(dragEvent: DragEvent) {
    dragEvent.dataTransfer.dropEffect = 'move';
    dragEvent.preventDefault();
  }

  delete(){
    this.deleteList.emit(this.listIndex);

  }


  dropCard(dragEvent: DragEvent) {
    const data = JSON.parse(dragEvent.dataTransfer.getData('text'));
    const elements: Element[] = this.document.elementsFromPoint(dragEvent.x, dragEvent.y);
    const cardElementBeingDroppedOn = elements.find( x => x.tagName.toLowerCase() === 'app-card-summary');
    const listElementBeingDroppedOn = elements.find( x => x.tagName.toLowerCase() === 'app-list');
    const listIndexDroppedOn = parseInt(listElementBeingDroppedOn.getAttribute('listIndex'), 10);
    const cardIndexDroppedOn  = cardElementBeingDroppedOn === undefined ? undefined :
      parseInt(cardElementBeingDroppedOn.getAttribute('cardIndex'), 10);
    const listIndexDragged = parseInt(data.listIndex, 10);
    const cardIndexDragged = parseInt(data.cardIndex, 10);

    if (listIndexDragged === listIndexDroppedOn) {
      // same list just re-organize the cards
      const cardDragged = this.list.cards.splice(cardIndexDragged,1);
      this.list.cards.splice(cardIndexDroppedOn , 0 , ...cardDragged);
    } else {
      this.moveCardAcrossList.emit(new Movement(listIndexDragged, listIndexDroppedOn , cardIndexDragged , cardIndexDroppedOn));
    }

  }


}
