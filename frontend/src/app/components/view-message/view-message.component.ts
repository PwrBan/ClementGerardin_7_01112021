
import { Component, OnInit, Input } from '@angular/core';
import { Observable} from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/model/post.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.scss']
})
export class ViewMessageComponent{

  public readonly posts$: Observable<Post[]>;
  public userId: number;
  public storage: any;
  public isAdmin: number;


  constructor(private postService : PostService, private authService: AuthService) {
    this.posts$ = this.postService.findAll();
    if(sessionStorage.user){
      this.userId = this.authService.storage.userId;
      this.isAdmin = this.authService.isAdmin
    }

}
  delete(id: string){
    this.postService.delete(id)
    .subscribe(() => {console.log('Enregistrement fini')},
      (error) => { console.log(error);})
    location.reload();
  }

  onLike(postId: string){}
}




