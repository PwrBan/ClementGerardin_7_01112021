export class Post {
  public nom: string;
  public prenom: string;
  public userId: number;
  public message: string;
  public posted_at: Date;
  public image: File;

  public constructor(data: Partial<Post> = {}) {
    Object.assign(this , data);
  }
}
