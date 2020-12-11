import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { PostsService } from '../../shared/services/posts.service';
import { switchMap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../shared/interfaces';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  post: Post;
  isSubmitted = false;

  // Subscriptions
  postsSub: Subscription;
  updatePostSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params) => {
        return this.postsService.getPostById(params['id']);
      }))
      .subscribe((post) => {
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required)
        });
      });
  }

  get titleControl() {
    return this.form.get('title');
  }

  get textControl() {
    return this.form.get('text');
  }

  submitForm() {
    if (this.form.invalid) {
      return;
    }

    this.isSubmitted = true;
    const updatePost = {
      ...this.post,
      ...this.form.value
    };

    this.updatePostSub = this.postsService.updatePost(updatePost)
      .subscribe(post => {
        this.isSubmitted = false;
      }, error => {
        this.isSubmitted = false;
      });

  }

  ngOnDestroy(): void {
    if (this.updatePostSub) {
      this.updatePostSub.unsubscribe();
      this.updatePostSub = null;
    }
  }
}
