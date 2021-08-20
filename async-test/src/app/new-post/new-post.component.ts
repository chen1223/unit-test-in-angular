import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  mode;
  postId;

  postForm = this.fb.group({
    id: [null],
    title: [null, [Validators.required]],
    body: [null, [Validators.required]]
  });

  constructor(private fb: FormBuilder,
              private postService: PostService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPostID();
  }

  getPostID(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.postId = paramMap.get('id');
      if (this.postId) {
        this.getPostDetail();
        this.mode = 'update';
      } else {
        this.mode = 'create';
      }
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
        this.postForm.patchValue(res);
      },
      err => {
        console.error('Get post detail error', err);
      }
    );
  }

  submitForm(): void {
    if (this.postForm.valid) {
      if (window.confirm('Are you sure you want to save the post?')) {
        const title = this.postForm.get('title').value;
        const post = this.postForm.get('body').value;
        const apiCall = this.mode === 'create' ?
                          this.postService.createPost(title, post) :
                          this.postService.updatePost(this.postId, title, post);
        apiCall.subscribe(
          res => {
            window.alert(`Post ${this.mode === 'create' ? 'created' : 'updated'} successfully!`);
            this.router.navigateByUrl('');
          },
          err => {
            console.error(`${this.mode === 'create' ? 'Create' : 'Update'} post error`, err);
          }
        );
      }
    }
  }

  cancel(): void {
    if (this.mode === 'create') {
      this.router.navigateByUrl('');
    } else {
      this.router.navigateByUrl(`/post/${this.postId}`);
    }
  }
}
