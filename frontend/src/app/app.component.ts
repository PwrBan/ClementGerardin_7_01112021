import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NbMenuService, NbMenuItem } from '@nebular/theme';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  items: NbMenuItem[] = [
    {
      title: 'Connexion',
      link: '/auth'
    },
    {
      title: 'S\'inscrire',
      link: '/signUp'
    }
  ];

  public isAuth: Boolean;

  constructor(private authService: AuthService, private nbMenuService: NbMenuService, private router: Router){
    this.isAuth = this.authService.isConnected();
  }

  onDisconnect(){
    this.isAuth = this.authService.disconnect();
    this.router.navigate(['auth'])
    }
  }
