import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserEntity } from "./entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { config } from "dotenv";
import { AtGuard } from "./auth/guards/at.guard";
import { APP_GUARD } from "@nestjs/core";
import { MailingModule } from './mailing/mailing.module';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserEntity],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    MailingModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
