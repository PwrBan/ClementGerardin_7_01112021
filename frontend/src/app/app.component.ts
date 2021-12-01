import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map} from 'rxjs/operators';
import { PostService } from './services/post.service';
import { AuthService } from './auth/auth.service';
import { NB_WINDOW, NbMenuService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ListKeyManager } from '@angular/cdk/a11y';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isAuth: Boolean;

  constructor(private authService: AuthService, private nbMenuService: NbMenuService, private router: Router){
    this.isAuth = this.authService.isConnected();
  }
  items = [
    { title: 'Se connecter', data: {path: 'auth'}},
    { title: 'S\'inscrire', data: {path: 'signUp'}},
  ];

  ngOnInit() {
    this.nbMenuService.onItemClick()
    .pipe(
      filter(({tag}) => tag === 'my-context-menu'),
      map(({item: { data }}) => data),
    )
    .subscribe(title => this.router.navigate([title.path]));
  }
  onDisconnect(){
    this.isAuth = this.authService.disconnect();
  }
  }
