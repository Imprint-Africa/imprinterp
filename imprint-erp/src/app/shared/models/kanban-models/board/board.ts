import {ListInterface} from "../list/list";


export interface BoardInterface {
  id: string;
  name: string;
  lists: ListInterface[];

}


export class Board implements BoardInterface{
  id: string;
  name: string;
  lists: ListInterface[];

}
