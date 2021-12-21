import { Component, OnInit, ViewChild} from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user.model';
import { NbPopoverDirective } from '@nebular/theme';
import { FormGroup, FormBuilder} from '@angular/forms';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

@Injectable()
export class SignUpComponent implements OnInit {
  public mailAlreadyTaken: boolean = false;

  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;
  public signUpProfile: FormGroup;

  constructor( private userService: UserService, private router: Router, private fb: FormBuilder) {}

  public showPassword = true;

  ngOnInit() {
    this.signUpProfile = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{8,}')
      ]],
      email: ['', [Validators.required, Validators.email]]
    })


  }
  get email(){
    return this.signUpProfile.get('email');
  }
  get password(){
    return this.signUpProfile.get('password');
  }

  public getInputType() {
    if (this.showPassword) {
      return 'password';
    }
    return 'text';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  public onSignUp() {
    const user = new User(this.signUpProfile.value.nom, this.signUpProfile.value.prenom, this.signUpProfile.value.email, this.signUpProfile.value.password);
    this.userService.signUp(user)
    .subscribe(
      () => {
        this.router.navigate(['/auth']);
      },
      (err) => {
        this.mailAlreadyTaken = true;
      })

  }
}


