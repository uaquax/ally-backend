import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AtStrategy } from "./strategies/at.strategy";
import { RtStrategy } from "./strategies/rt.strategy";
import { ConfigModule } from "@nestjs/config";
import { MailingService } from "src/mailing/mailing.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/user.entity";
import { SessionEntity } from "src/entities/session.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, SessionEntity]),
    JwtModule.register({
      secret: "jwt-secret",
      signOptions: {
        expiresIn: "15m",
      },
    }),
    UsersModule,
    PassportModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [MailingService, AuthService, AtStrategy, RtStrategy],
})
export class AuthModule {}
