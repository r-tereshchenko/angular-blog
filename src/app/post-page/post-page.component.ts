import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CreditCardComponent } from '../shared/components/credit-card/credit-card.component';
import { RefDirective } from '../shared/directives/ref.directive';
import { PostsService } from '../shared/services/posts.service';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  @ViewChild(RefDirective, {static: false}) ref: RefDirective;

  post$: Observable<Post>

  closeCardSub: Subscription;

  constructor(
    private resolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {
  }

  ngOnInit(): void {
    this.post$ = this.route.params
      .pipe(
        switchMap((params) => this.postsService.getPostById(params.id))
      );
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
