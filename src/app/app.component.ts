import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from './services/post.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isAuth: boolean = true;
  disconnect() {
    this.isAuth = false;
  }
  connect() {
    this.isAuth = true;
  }
}
