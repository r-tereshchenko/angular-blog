import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[app-ref]'
})

export class RefDirective {
  constructor(public containerRef: ViewContainerRef) {
  }
}
