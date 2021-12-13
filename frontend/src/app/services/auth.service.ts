import { Injectable} from "@angular/core";
import jwtDecode from "jwt-decode";


@Injectable()
export class AuthService{

  public isAuth: boolean;
  public decoded: any;
  public isAdmin: number;
  public storage: any;


  public constructor(){
    this.storage = JSON.parse(localStorage.user || '{}');
    if(localStorage.user){
      this.storage = JSON.parse(localStorage.user || {});
      this.decoded = jwtDecode(this.storage.token);
      this.isAdmin = this.decoded.admin;
    }
  }

  public disconnect() {
    localStorage.removeItem('user');
    return this.isAuth = false;
  }
  public isConnected(){
    if(localStorage.user) {
      return this.isAuth = true;
    } else {
      return this.isAuth = false;
    }
  }

  public getToken(): string {
    return String(this.storage.token);
  }
}
