import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { AtGuard } from "src/auth/guards/at.guard";
import { Public } from "src/auth/decorators/public.decorator";

@Controller("/api/users/")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get("/id/:id")
  async getUserById(@Param("id", ParseUUIDPipe) id) {
    return await this.usersService.findByIdPub(id);
  }

  @Public()
  @Get("/email/:email")
  @UseGuards(AtGuard)
  async getUserByEmail(@Param("email") email) {
    return await this.usersService.findByEmailPub(email);
  }
}
