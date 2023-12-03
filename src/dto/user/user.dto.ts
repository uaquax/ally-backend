import { Exclude } from "class-transformer";

export class User {
  public id: number;
  public _id: string;
  public name: string;
  public email: string;
  public username: string;

  @Exclude()
  public password: string;

  @Exclude()
  public hashedRt: string;
}
