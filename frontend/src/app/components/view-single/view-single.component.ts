import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post} from '../../model/post.model';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-single',
  templateUrl: './view-single.component.html',
  styleUrls: ['./view-single.component.scss']
})
export class ViewSingleComponent{

  public readonly post$: Observable<Post[]>;
  public readonly comments$: Observable<Post[]>;
  public postId: any;

  constructor(private postService: PostService, private router: Router) {
    console.log(this.postId);

    this.post$ = this.postService.findOne();
    this.comments$ = this.postService.findAllComments();
   }

   getPostId(postId:string) {
    this.postId = postId;
   }
   onComment(f: NgForm) {
    const session = JSON.parse(sessionStorage.getItem('user') || '{}');
      const comment = new Post ({
        userId: session.userId,
        message: f.value.comment,
        posted_at: new Date,
        postId: this.postId
      })
      this.postService.comments(comment)
      f.reset()
   }
}
