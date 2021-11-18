import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-message',
  templateUrl: './post-message.component.html',
  styleUrls: ['./post-message.component.scss']
})
export class PostMessageComponent {

  public file:File;
  public formData = new FormData();

  constructor(private postService: PostService, private router: Router) {}

  public onFileSelected(event: any) {
    this.file = event.target.files[0]
    if(this.file) {
      this.formData.append("thumbnail", this.file)
      console.log(this.formData);

    }
  }
  public onSubmit(form: NgForm) {
    const session = JSON.parse(sessionStorage.getItem('user') || '{}');
      const post = new Post
      ({
          nom: session.nom,
          prenom: session.prenom,
          userId: session.userId,
          message: form.value.message,
          posted_at: new Date,
          image: this.file
        })
      console.log(post);

      this.postService.create(post)
      this.router.navigate(['view'])
  }
}