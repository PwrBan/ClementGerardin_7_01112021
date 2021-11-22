import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post} from '../../model/post.model';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-view-single',
  templateUrl: './view-single.component.html',
  styleUrls: ['./view-single.component.scss']
})
export class ViewSingleComponent implements OnInit{

  public readonly post$: Observable<Post[]>;
  public readonly comments$: Observable<Post[]>;
  @Input() postId: any;

  constructor(private postService: PostService) {
    console.log(this.postId);

    this.post$ = this.postService.findOne();
   }

   ngOnInit(){
    console.log(this.postId);

  }

   onComment(f: NgForm) {
    const session = JSON.parse(sessionStorage.getItem('user') || '{}');
      const comment = new Post ({
        userId: session.userId,
        message: f.value.comment,
        posted_at: new Date
      })
      this.postService.comments(comment)
   }
}
