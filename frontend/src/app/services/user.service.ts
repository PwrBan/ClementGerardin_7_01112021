import { User } from "../model/user.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class UserService{

public constructor(private http: HttpClient){}

  public signUp(user: User):Observable<any>{
    return this.http
      .post('http://localhost:3000/api/auth/signup', user)
}
  public login (email:string, password:string)  {
    const user = {
        email: email,
        password: password
      }
    return this.http.post('http://localhost:3000/api/auth/login', user)

  }

}
