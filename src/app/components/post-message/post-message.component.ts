import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-message',
  templateUrl: './post-message.component.html',
  styleUrls: ['./post-message.component.scss']
})
export class PostMessageComponent implements OnInit {
  public posts$: Observable<any[]>;
  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {}
  public onSubmit(form: NgForm) {
      const post = new Post( form.value.pseudo, form.value.message, new Date)
      this.postService.addPost(post)
      this.router.navigate(['/view'])
}

}
