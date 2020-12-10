import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {
  @Output() closeCard: EventEmitter<Event> = new EventEmitter<Event>()

  constructor() { }

  ngOnInit(): void {
  }
}
