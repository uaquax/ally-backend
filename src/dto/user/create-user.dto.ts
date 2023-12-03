import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString()
  @Length(1, 30)
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @Length(5, 20)
  @IsNotEmpty()
  public username: string;

  @IsString()
  @Length(8, 20)
  @IsNotEmpty()
  public password: string;
}
