import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.scss']
})
export class ViewMessageComponent implements OnInit {

  public posts = Array<any>();

  constructor(private postService : PostService) {}

  ngOnInit() {
    this.posts = this.postService.getPostFromArray();
  }
}
