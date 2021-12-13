export class Post {
  public id: number;
  public nom: string;
  public prenom: string;
  public user_id: number;
  public message: string;
  public posted_at: Date;
  public image: FormData;
  public liked: number;

  public constructor(data: Partial<Post> = {}) {
    Object.assign(this , data);
  }
}
