import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, PostService } from '../services/post.service';
import { faPencilAlt, faTrash, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  userIcon = faUserCircle;
  pencilIcon = faPencilAlt;
  deleteIcon = faTrash;

  postId;
  post: Post;

  constructor(private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private router: Router) { }

  ngOnInit() {
    this.getPostID();
  }

  getPostID(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.postId = paramMap.get('id');
      this.getPostDetail();
    });
  }

  getPostDetail(): void {
    this.postService.getSinglePost(this.postId).pipe(
      map(res => {
        res.userName = this.postService.getAuthor(res.userId);
        return res;
      })
    ).subscribe(
      res => {
        this.post = res;
      },
      err => {
        console.error('Get post detail error', err);
      }
    );
  }

  editPost(): void {
    if (window.confirm('Are you sure you want to eidt this post?')) {
      this.router.navigateByUrl(`/post/${this.postId}/update`);
    }
  }

  deletePost(): void {
    if (window.confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(this.postId).subscribe(
        () => {
          window.alert('Post deleted successfully');
          this.router.navigateByUrl('');
        },
        err => {
          console.error('Post deletion error!', err);
        }
      );
    }
  }
}
