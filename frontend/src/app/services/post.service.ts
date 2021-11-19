import { Post } from "../model/post.model";
import { Subject, Subscription, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable()
export class PostService {
  public posts: Array<any> = []
  public headers: HttpHeaders;


  constructor(private httpClient: HttpClient) {
  }
  public findAll(): Observable<Post[]> {
    return this.httpClient.get<any[]>('http://localhost:3000/api/post')
    .pipe(map((result: any) => result.result || []))
  }

  create(post: FormData) {
    console.log(post);
    this.httpClient
      .post('http://localhost:3000/api/post', post)
      .subscribe(() => {console.log('Enregistrement fini')},
      (error) => { console.log(error);}
    )
  }
}


