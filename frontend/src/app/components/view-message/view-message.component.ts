
import { Component, OnInit, Input } from '@angular/core';
import { Observable} from 'rxjs';
import { map, filter} from 'rxjs/operators'
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/model/post.model';
import { AuthService } from 'src/app/auth/auth.service';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { Like } from 'src/app/model/like.model';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.scss']
})
export class ViewMessageComponent implements OnInit{

  public readonly posts$: Observable<Post[]>;
  public readonly likes$: Observable<Like[]>;
  public readonly hasUserLike$: Observable<boolean>;
  public userId: number;
  public storage: any;
  public isAdmin: number;
  public postId: string;
  public items = [
    { title: 'Supprimer'}
  ]

  constructor(private postService : PostService, private authService: AuthService, private nbMenuService: NbMenuService) {
    this.posts$ = this.postService.findAll();
    this.likes$ = this.postService.findAllLike();
    this.hasUserLike$ = this.likes$.pipe(
      map((likes: Like[]) => !!likes.find((like: Like) => like.postLiked))
      )
    if(sessionStorage.user){
      this.userId = this.authService.storage.userId;
      this.isAdmin = this.authService.isAdmin
    }
}
  ngOnInit() {
    this.nbMenuService.onItemClick()
    .subscribe(() => { this.delete(this.postId)})
  }

  getPostId(postId: string) {
    this.postId = postId;
  }

  delete(id: string){
    this.postService.delete(id)
    .subscribe(() => {console.log('Post supprimé')},
      (error) => { console.log(error);})
  }

  onLike(postId: string){
    this.postService.like(postId, this.userId);
    location.reload();
  }


}




