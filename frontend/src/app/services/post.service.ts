import { Post } from "../model/post.model";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import {  Router , ActivatedRoute } from "@angular/router";
import { Comment } from "../model/comment.model";

@Injectable()
export class PostService {
  public id: any;


  public constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) {}

  public findAll(): Observable<Post[]> {
    return this.httpClient.get<any[]>('http://localhost:3000/api/view')
    .pipe(
      first(),
      map((result: any) => result.result || []))
  }

  public findOne(): Observable<Post[]> {
    return this.httpClient.get<any[]>('http://localhost:3000/api' + this.router.url)
    .pipe(
      first(),
      map((result:any) => result.result || []))
  }

  createComments(comments: Comment): Observable<any> {
    return this.httpClient
      .post('http://localhost:3000/api/view/comments', comments)
  }

  findAllComments() {
    return this.httpClient
      .get('http://localhost:3000/api' + this.router.url + '/comments')
      .pipe(
        first(),
        map((result:any) => result.result || []))
    }

  create(post: FormData): Observable<any> {
    return this.httpClient
      .post('http://localhost:3000/api/view', post)
  }

  delete(id:number): Observable<any>{
    return this.httpClient
    .delete('http://localhost:3000/api/view/' + id)
  }

  findAllLike(): Observable<any>{
    const user = JSON.parse(localStorage.user)
    return this.httpClient
    .get('http://localhost:3000/api/view/' + user.userId + '/like')
    .pipe(
      first(),
      map((result:any) => result.result || []))
  }

  like(postId: number, userId: number) {
    const userLiked = [
      {
        postId: postId,
        userId: userId
      }
    ]
    return this.httpClient
    .post('http://localhost:3000/api/view/' + postId + '/like', userLiked)
}
}

