import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-stamp',
  templateUrl: './stamp.component.html',
  styleUrls: ['./stamp.component.scss']
})
export class StampComponent implements OnInit {
  email: string = '';
  customerCard!: Observable<any>;
  card: any;
  constructor(private route: ActivatedRoute, private cardService: CardService) { }

  ngOnInit(): void {
    this.email = this.route.snapshot.params.id;
    this.cardService.loadCardByEmail(this.email).pipe(map(c => {
      debugger;
      this.card = c[0];
    }));
  }

  addPoint() {
    debugger;
    this.card.points++;
  }

  removePoint() {
    this.card.points--;
  }

  clearPoints() {
    this.card.points = 0;
  }


}
