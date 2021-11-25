import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from './services/post.service';
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public isAuth: Boolean;
  disconnect() {
    sessionStorage.removeItem('user');
  }
  public isConnected() {
    if(sessionStorage.user) {
      return this.isAuth = true;
    } else {
      return this.isAuth = false;
    }
  }
  }
