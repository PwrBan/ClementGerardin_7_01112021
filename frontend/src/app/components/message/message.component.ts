import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { Like } from 'src/app/model/like.model';
import { Observable, combineLatest } from 'rxjs';
import { map, first} from 'rxjs/operators';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { OnAttributeChange, OnDestroyListener, takeUntilDestroy } from '@witty-services/ngx-common';
import { ifNotNull, softCache } from '@witty-services/rxjs-common';

@OnDestroyListener()
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {

  @Input() public post: Post;
  public readonly hasUserLike$: Observable<boolean>;
  public readonly likes$: Observable<Like[]>;
  public userId: number;
  public isAdmin: number;


  @OnAttributeChange()
  public readonly post$: Observable<Post>;

  constructor(private readonly postService: PostService, private readonly authService: AuthService) {
    this.likes$ = this.postService.findAllLike().pipe(softCache());
    this.hasUserLike$ = combineLatest([this.likes$, this.post$.pipe(ifNotNull())]).pipe(
      map(([likes, post]: [Like[], Post]) => !!likes.find((like: Like) => like.userLiked === this.authService.storage.userId && post.id === like.postLiked)),
      softCache()
    )
    if(localStorage.user){
      this.userId = this.authService.storage.userId;
      this.isAdmin = this.authService.isAdmin
    }
   }

   ngOnInit() {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    }
  }
  ngOnDestroy(): void {
      if(localStorage.getItem('foo')) {
        localStorage.removeItem('foo');
      }
  }


  delete(id: number){
    this.postService.delete(id)
    .pipe(takeUntilDestroy(this))
    .subscribe(() => {
      console.log('Post supprimé');
      location.reload();
    },
      (error) => { console.log(error) })
  }
  onLike(postId: number){
    this.postService.like(postId, this.userId)
    .pipe(first())
    .subscribe(() => {
      location.reload()
    },
    (err) => console.log(err)
    )}

}
