export class Like {
  userLiked : number;
  postLiked : number;

  public constructor(data: Partial<Like> = {}) {
    Object.assign(this , data);
  }
}
