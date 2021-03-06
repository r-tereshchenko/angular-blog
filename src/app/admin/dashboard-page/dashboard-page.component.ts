import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { PostsService } from '../../shared/services/posts.service';
import { Post } from '../../shared/interfaces';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  searchStr = ''

  // Subscriptions
  postsSub: Subscription;
  removePostSub: Subscription;

  constructor(
    private postsService: PostsService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.postsSub = this.postsService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  removePost(id: string) {
    this.removePostSub = this.postsService.removePost(id)
      .subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== id)
        this.alertService.warning('Post has been removed')
      })
  }

  ngOnDestroy(): void {
    if (this.postsSub) {
      this.postsSub.unsubscribe();
      this.postsSub = null;
    }
    if (this.removePostSub) {
      this.removePostSub.unsubscribe();
      this.removePostSub = null;
    }
  }
}
