export class Comment {
  public nom: string;
  public prenom: string;
  public userId: string;
  public comment: string;
  public date: Date;
  public image: FormData;
  public postId: string;

  public constructor(data: Partial<Comment> = {}) {
    Object.assign(this , data);
  }
}
