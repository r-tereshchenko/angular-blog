import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { PostsService } from '../shared/services/posts.service';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  posts: Post[]

  // Subscriptions
  postsSub: Subscription

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsSub = this.postsService.getPosts().subscribe((posts) => {
      this.posts = posts
    })
  }

  ngOnDestroy(): void {
    if (this.postsSub) {
      this.postsSub.unsubscribe();
      this.postsSub = null;
    }
  }

}
