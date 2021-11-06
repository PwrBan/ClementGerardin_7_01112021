import { Post } from "../model/post.model";
import { Subject, Subscription, Observable } from "rxjs";

export class PostService {
  public posts: Array<any> = [
    {
      pseudo: "PwrBanana",
      message: "Coucou, bande de nouilles",
      posted_at: new Date
    },
    {
      pseudo: "PwrBanana",
      message: "Hello",
      posted_at: new Date
    }
  ]
  public getPostFromArray() {
    return this.posts
  }

  addPost(post: Post) {
    this.posts.push(post);
  }
}
