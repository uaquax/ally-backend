import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "src/dto/user/create-user.dto";

@Controller("/api/users/")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
