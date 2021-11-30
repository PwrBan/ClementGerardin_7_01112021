import { Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user.model';
import { NbPopoverDirective } from '@nebular/theme';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

@Injectable()
export class SignUpComponent {

  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

  constructor( private userService: UserService, private router: Router) { }

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
  public onSignUp(form: NgForm) {
    const user = new User(form.value.nom, form.value.prenom, form.value.email, form.value.password);
    this.userService.signUp(user)
    .subscribe(
      () => {
        this.router.navigate(['/view']);
      },
      (err) => {
        this.popover.show();
        setTimeout(() => {
          this.popover.hide();
        }, 2000);

      })

  }

}

