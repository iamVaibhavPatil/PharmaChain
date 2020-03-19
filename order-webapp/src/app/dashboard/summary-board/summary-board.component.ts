import { Component, OnInit, Input } from '@angular/core';
import { SummaryBoard } from './summary-board.model';

@Component({
  selector: 'app-summary-board',
  templateUrl: './summary-board.component.html',
  styleUrls: ['./summary-board.component.scss']
})
export class SummaryBoardComponent implements OnInit {

  @Input() card: SummaryBoard;

  constructor() { }

  ngOnInit() {
    console.log(this.card);
  }

}
