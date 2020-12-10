import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';

import { CreditCardComponent } from '../shared/components/credit-card/credit-card.component';
import { RefDirective } from '../shared/directives/ref.directive';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  @ViewChild(RefDirective, {static: false}) ref: RefDirective;

  closeCardSub: Subscription;

  constructor(
    private resolver: ComponentFactoryResolver
  ) {
  }

  ngOnInit(): void {
  }

  showCard() {
    const factory = this.resolver.resolveComponentFactory(CreditCardComponent);
    this.ref.containerRef.clear();

    const cardComponent = this.ref.containerRef.createComponent(factory);
    this.closeCardSub = cardComponent.instance.closeCard.subscribe((event) => {

      if (event.target.dataset.close) {
        this.ref.containerRef.clear();
        this.closeCardSub.unsubscribe();
        this.closeCardSub = null;
      }
    });
  }

}
