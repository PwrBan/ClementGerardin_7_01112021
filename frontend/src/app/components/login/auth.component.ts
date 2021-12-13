import { Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AppComponent } from 'src/app/app.component';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NbPopoverDirective } from '@nebular/theme';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent  {

  constructor(private router: Router, private userService: UserService, private appComponent: AppComponent, private authService: AuthService) { }

  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

  public showPassword = true;

  public getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  onLogin(form: NgForm) {
    this.userService.login(form.value.email, form.value.password)
    .subscribe(
      (res) => {
        const result = Object.values(res);
        const user = {
          'prenom' : result[0].prenom,
          'nom' : result[0].nom,
          'email' : result[0].email,
          'userId' : result[0].userId,
          'token' : result[0].token
        }
        localStorage.setItem('user', JSON.stringify(user))
        this.authService.isConnected();
        this.appComponent.isAuth = true;
        this.router.navigate(['view']);
      },
      (err) => {
        this.popover.show()
      }
    )

  }
}


