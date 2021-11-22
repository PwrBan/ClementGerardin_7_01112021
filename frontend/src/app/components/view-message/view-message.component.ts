
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/model/post.model';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.scss']
})
export class ViewMessageComponent implements OnInit{

  public readonly posts$: Observable<Post[]>;
  public userId: number;
  public session: any;
  @Input() postId: number;

  constructor(private postService : PostService) {
    this.posts$ = this.postService.findAll();
  }

  ngOnInit(){
    this.getUserId();
  }

  getUserId() {
    if(sessionStorage.user){
      this.session = JSON.parse(sessionStorage.user);
      this.userId = this.session.userId;
      }
    }
  }


