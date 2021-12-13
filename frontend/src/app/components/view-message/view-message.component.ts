import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/model/post.model';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.scss']
})
export class ViewMessageComponent {

  public readonly posts$: Observable<Post[]>;

  constructor(private postService : PostService) {
    this.posts$ = this.postService.findAll();
  }
}




