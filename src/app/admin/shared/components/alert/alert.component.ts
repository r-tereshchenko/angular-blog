import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { Subscription } from 'rxjs';

import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ right: -200, opacity: 0 }),
            animate('.3s ease-in-out',
              style({ right: 10, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ right: 10, opacity: 1 }),
            animate('.3s ease-in-out',
              style({ right: -200, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})

export class AlertComponent implements OnInit, OnDestroy {
  public message = '';
  public type = '';
  delay = 4000;

  // Subscriptions
  alertSub: Subscription;

  constructor(
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.alertSub = this.alertService.alert$
      .subscribe((alert) => {

        this.message = alert.message;
        this.type = alert.type;

        const timeout = setTimeout(() => {
          this.message = '';
          clearTimeout(timeout);
        }, this.delay);
      });
  }

  ngOnDestroy(): void {
    if (this.alertSub) {
      this.alertSub.unsubscribe();
      this.alertSub = null;
    }
  }
}
