import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public isAuth: boolean = true;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  connect() {
    this.isAuth = true;
    this.router.navigate(['view'])
  }
}
