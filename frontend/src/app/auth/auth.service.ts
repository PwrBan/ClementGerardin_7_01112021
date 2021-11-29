import { Injectable} from "@angular/core";
import jwtDecode from "jwt-decode";


@Injectable()
export class AuthService{

  public isAuth: Boolean;
  public decoded: any;
  public isAdmin: number;
  public storage: any;

  constructor(){
    if(sessionStorage.user){
      this.storage = JSON.parse(sessionStorage.user || {});
      this.decoded = jwtDecode(this.storage.token)
      this.isAdmin = this.decoded.admin;
    }
  }

  public disconnect() {
    sessionStorage.removeItem('user');
    return this.isAuth = false;
  }
  public isConnected(){
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
