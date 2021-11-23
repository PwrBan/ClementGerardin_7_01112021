import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post} from '../../model/post.model';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Comment } from '../../model/comment.model';

@Component({
  selector: 'app-view-single',
  templateUrl: './view-single.component.html',
  styleUrls: ['./view-single.component.scss']
})
export class ViewSingleComponent{

  public readonly post$: Observable<Post[]>;
  public readonly comments$: Observable<Comment[]>;
  public postId: any;

  constructor(private postService: PostService, private router: Router) {
    this.post$ = this.postService.findOne();
    this.comments$ = this.postService.findAllComments();
   }

   getPostId(postId:string) {
    this.postId = postId;
   }
   onComment(f: NgForm) {
    const session = JSON.parse(sessionStorage.getItem('user') || '{}');
      const comment = new Comment ({
        userId: session.userId,
        comment: f.value.comment,
        date: new Date,
        postId: this.postId
      })
      console.log(f.value.comment);
      this.postService.createComments(comment)
      f.reset()
   }
}
