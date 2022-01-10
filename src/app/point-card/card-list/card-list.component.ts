import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  public cards: Observable<any[]> = new Observable<any[]>();
  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.cards = this.cardService.loadAllCards();
  }

}
