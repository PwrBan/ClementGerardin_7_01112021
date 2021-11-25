import { Injectable, OnInit } from "@angular/core";


@Injectable()
export class AuthService{

  public isAuth: Boolean;



  public disconnect() {
    sessionStorage.removeItem('user');
    return this.isAuth = false;
  }
  public isConnected() {
    if(sessionStorage.user) {
      return this.isAuth = true;
    } else {
      return this.isAuth = false;
    }
  }

  public getToken(): string {
    const storage = JSON.parse(sessionStorage.getItem('user') || '{}');
    return JSON.stringify(storage.token);
  }
}
