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
}
