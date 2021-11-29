import { Post } from "../model/post.model";
import { Subject, Subscription, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import {  Router , ActivatedRoute, NavigationEnd } from "@angular/router";
import { Comment } from "../model/comment.model";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Injectable()
export class PostService {
  public id: any;


  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) {}

  public findAll(): Observable<Post[]> {
    return this.httpClient.get<any[]>('http://localhost:3000/api/view')
    .pipe(map((result: any) => result.result || []))
  }

  public findOne(): Observable<Post[]> {
    return this.httpClient.get<any[]>('http://localhost:3000/api' + this.router.url)
    .pipe(map((result:any) => result.result ||[]))
  }

  createComments(comments: Comment) {
    this.httpClient
      .post('http://localhost:3000/api/view/comments', comments)
      .subscribe(() => {console.log('Enregistrement fini')},
      (error) => { console.log(error);}
    )
  }

  findAllComments() {
    return this.httpClient
      .get('http://localhost:3000/api' + this.router.url + '/comments')
      .pipe(map((result:any) => result.result || []))
    }

  create(post: FormData) {
    console.log(post);

    this.httpClient
      .post('http://localhost:3000/api/view', post)
      .subscribe(() => {console.log('Enregistrement fini')},
      (error) => { console.log(error);}
    )
  }

  delete(id:string): Observable<any>{
    console.log('http://localhost:3000/api/view/' + id);

    return this.httpClient
    .delete('http://localhost:3000/api/view/' + id)
  }

  like(postId: string, userId: number) {

    const userLiked = [
      {
        postId: postId,
        userId: userId
      }
    ]
    this.httpClient
    .post('http://localhost:3000/api/view/' + postId + '/like', userLiked)
    .subscribe(() => { console.log('Post liké');
    },
    (err) => { console.log(err);
    })
  }
}


