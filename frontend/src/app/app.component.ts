import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from './services/post.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isAuth: boolean;
  disconnect() {
    sessionStorage.removeItem('user');
    this.isConnected();
  }
  public isConnected() {
    if(sessionStorage.getItem('user')) {
      console.log('toto');
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  }
  ngOnInit(): void {
    this.isConnected();
  }

  }
