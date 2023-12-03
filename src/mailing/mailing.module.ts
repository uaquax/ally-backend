import { Module } from "@nestjs/common";
import { MailingController } from "./mailing.controller";
import { MailingService } from "./mailing.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

console.log(process.cwd() + "\\templates\\");
@Module({
  imports: [
    MailingModule,
    MailerModule.forRoot({
      transport:
        "smtps://lebedevpavel0511@gmail.com:nzpp fsaq xkmi hadh@smtp.gmail.com",
      template: {
        dir: process.cwd() + "\\templates\\",
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailingService],
  exports: [MailingService],
})
export class MailingModule {}
