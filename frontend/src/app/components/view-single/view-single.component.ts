import { Component, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post} from '../../model/post.model';
import { Observable,  combineLatest } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Comment } from '../../model/comment.model';
import { AuthService } from 'src/app/services/auth.service';
import { OnAttributeChange, OnDestroyListener} from '@witty-services/ngx-common';
import { ifNotNull, softCache } from '@witty-services/rxjs-common';
import { Like } from 'src/app/model/like.model';

@OnDestroyListener()
@Component({
  selector: 'app-view-single',
  templateUrl: './view-single.component.html',
  styleUrls: ['./view-single.component.scss']
})
export class ViewSingleComponent{

  @Input() public post: Post;
  public readonly comments$: Observable<Comment[]>;
  public readonly hasUserLike$: Observable<boolean>;
  public readonly likes$: Observable<Like[]>;
  public postId: any;
  public isAdmin: number;
  public userId: number;

  @OnAttributeChange()
  public readonly post$: Observable<Post>;

  constructor(private postService: PostService, private authService: AuthService) {
    this.likes$ = this.postService.findAllLike().pipe(softCache());
    this.hasUserLike$ = combineLatest([this.likes$, this.post$.pipe(ifNotNull())]).pipe(
      map(([likes, post]: [Like[], Post]) => !!likes.find((like: Like) => like.userLiked === this.authService.storage.userId && post.id === like.postLiked)),
      softCache()
    )
    this.comments$ = this.postService.findAllComments();
    this.userId = this.authService.storage.userId;
    this.isAdmin = this.authService.isAdmin

   }

   getPostId(postId:number) {
    this.postId = postId;
   }
   onComment(f: NgForm) {
    const session = JSON.parse(localStorage.getItem('user') || '{}');
      const comment = new Comment ({
        userId: session.userId,
        comment: f.value.comment,
        date: new Date,
        postId: this.postId
      })
      console.log(f.value.comment);
      this.postService.createComments(comment)
      .pipe(
      first())
      .subscribe(() => {
        location.reload()
      },
      (err) => console.log(err)
      )
    }
   onLike(postId: number){
    this.postService.like(postId, this.authService.storage.userId)
    .subscribe(() => {
      location.reload()
    },
    (err) => console.log(err)
    )
  }

   delete(postId: number){
    this.postService.delete(postId)
    .subscribe(() => {
      location.reload()
    },
    (err) => console.log(err)
    )
  }
}
