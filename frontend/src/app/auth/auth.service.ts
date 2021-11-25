import { Injectable } from "@angular/core";


@Injectable()
export class AuthService {

  public getToken(): string {
    const storage = JSON.parse(sessionStorage.getItem('user') || '{}');
    return JSON.stringify(storage.token);
  }
}
