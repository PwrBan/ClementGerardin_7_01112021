import { Post } from "../model/post.model";
import { Subject, Subscription, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import {  Router , ActivatedRoute, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import { UrlSegment } from "@angular/router";

@Injectable()
export class PostService implements OnInit {
  public id: any;


  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) {}

  public findAll(): Observable<Post[]> {
    console.log(this.activatedRoute.snapshot.url);

    return this.httpClient.get<any[]>('http://localhost:3000/api/view')
    .pipe(map((result: any) => result.result || []))
  }

  ngOnInit() {}

  public findOne(): Observable<Post[]> {
    return this.httpClient.get<any[]>('http://localhost:3000/api' + this.router.url)
    .pipe(map((result:any) => result.result ||[]))
  }

  comments(comments: Post) {
    this.httpClient
      .post('http://localhost:3000/api/view/comments', comments)
      .subscribe(() => {console.log('Enregistrement fini')},
      (error) => { console.log(error);}
    )
  }

  create(post: FormData) {
    console.log(post);
    this.httpClient
      .post('http://localhost:3000/api/view', post)
      .subscribe(() => {console.log('Enregistrement fini')},
      (error) => { console.log(error);}
    )
  }
}


