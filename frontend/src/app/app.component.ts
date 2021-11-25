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

  constructor(private authService: AuthService){
    this.isAuth = this.authService.isConnected();
  }
  onDisconnect(){
    this.isAuth = this.authService.disconnect();
  }
  }
