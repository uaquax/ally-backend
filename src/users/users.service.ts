import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";
import { UserEntity } from "src/entities/user.entity";
import { User } from "src/dto/user/user.dto";
import { CreateUserDto } from "src/dto/user/create-user.dto";
import { encode } from "src/uitils";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  async createUser(user: User): Promise<User> {
    return plainToClass(User, await this.usersRepository.save(user));
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async findById(id: string): Promise<UserEntity> {
    return await this.usersRepository.findOneBy({ _id: id });
  }

  async updateUser(id: string, user: User): Promise<User> {
    await this.usersRepository.update(id, user);
    return this.findById(id);
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async updateRtHash(id: string, hash: string) {
    const user = await this.usersRepository.findOneBy({ _id: id });
    user.hashedRt = hash;

    return plainToClass(User, await this.usersRepository.save(user));
  }

  async signUp(userParams: CreateUserDto): Promise<User> {
    const password = await encode(userParams.password);
    const user = await this.usersRepository.create({
      ...userParams,
      createdAt: new Date(),
      password: password,
    });
    return plainToClass(User, this.usersRepository.save(user));
  }

  async logout(id: string) {
    const user = await this.usersRepository.findOneBy({ _id: id });
    user.hashedRt = "";

    return plainToClass(User, this.usersRepository.save(user));
  }

  async updateLastActive(id: string) {
    console.log(id);
    const user = await this.usersRepository.findOneBy({ _id: id });

    if (!user) throw new UnauthorizedException();

    user.lastActive = new Date();

    return plainToClass(User, await this.usersRepository.save(user));
  }
}
