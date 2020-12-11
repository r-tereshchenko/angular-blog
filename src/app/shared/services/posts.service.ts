import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FbCreatePostResponse, Post } from '../interfaces';
import { environment } from '../../../environments/environment';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  constructor(
    private http: HttpClient
  ) {
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.fbDbUrl}/posts.json`)
      .pipe(
        map(response => {
          return Object.keys(response)
            .map((id) => {
              return {
                ...response[id],
                id
              }
          })
        })
      )
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`)
      .pipe(
        map((post: Post) => {
          return {
            ...post,
            id,
            date: new Date(post.date)
          }
        })
      )
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(
        map((response: FbCreatePostResponse) => {
          return {
            ...post,
            id: response.name,
            date: new Date(post.date)
          }
        })
      )
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.fbDbUrl}/posts/${post.id}.json`, post)
  }

  removePost(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
  }
}
