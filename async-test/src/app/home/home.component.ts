import { Component, OnInit } from '@angular/core';
import { Post, PostService } from '../services/post.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Array<Post> = [];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts(): void {
    this.postService.getAllPosts()
    .pipe(
      map(res => {
        res.forEach(post => {
          post.userName = this.postService.getAuthor(post.userId);
        });
        return res;
      })
    ).subscribe(
      res => {
        this.posts = res;
      },
      err => {
        console.error('Get all posts error', err);
      }
    );
  }

}
