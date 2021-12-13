import { Component} from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/model/post.model';

@Component({
  selector: 'app-single-message',
  templateUrl: './single-message.component.html',
  styleUrls: ['./single-message.component.scss']
})
export class SingleMessageComponent{

  public readonly post$: Observable<Post[]>

  constructor(private postService: PostService) {
    this.post$ = this.postService.findOne();
   }
}
