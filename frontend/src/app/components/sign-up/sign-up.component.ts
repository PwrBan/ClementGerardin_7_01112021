import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user.model';

@Component({
  templateUrl: './sign-up.component.html'
})

@Injectable()
export class SignUpComponent {

  constructor( private userService: UserService, private router: Router) { }

  public onSignUp(form: NgForm) {
    const user = new User(form.value.nom, form.value.prenom, form.value.email, form.value.password);
    this.userService.signUp(user)
    .subscribe(
      () => { console.log('Inscription confirmée'); },
      (err) => { console.log(err); })
    this.router.navigate(['/view']);
  }

}

