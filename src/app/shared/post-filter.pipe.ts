import { Pipe, PipeTransform } from '@angular/core';

import { Post } from './interfaces';

@Pipe({
  name: 'postsFilter'
})

export class PostFilterPipe implements PipeTransform {
  transform(posts: Post[], str: string): Post[] {
    if (!str.trim()) {
      return posts
    }
    return posts.filter(post => post.title.toLowerCase().includes(str.toLowerCase()))
  }
}
