
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/model/post.model';
import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.scss']
})
export class ViewMessageComponent implements OnInit{

  public readonly posts$: Observable<Post[]>;
  public userId: number;
  public session: any;

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
      console.log(this.userId);
      }
    }
  }


