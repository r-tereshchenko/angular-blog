import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

export interface Alert {
  type: alertType
  message: string
}

export type alertType = 'success' | 'warning' | 'danger'

@Injectable()

export class AlertService {
  alert$ = new Subject<Alert>()

  success(message: string): void {
    this.alert$.next({ type: 'success', message })
  }

  warning(message: string): void {
    this.alert$.next({ type: 'warning', message })
  }

  danger(message: string): void {
    this.alert$.next({ type: 'danger', message })
  }
}
