import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Options } from "nodemailer/lib/smtp-transport";

@Injectable()
export class MailingService {
  constructor(private readonly mailerService: MailerService) {}

  private async setTransport() {
    const config: Options = {
      service: "gmail",
      auth: {
        user: process.env.STMP_USER,
        pass: process.env.STMP_PASSWORD,
      },
    };
    this.mailerService.addTransporter("gmail", config);
  }

  public async sendCode(code: String) {
    await this.setTransport();
    this.mailerService
      .sendMail({
        transporterName: "gmail",
        to: "uaquax@gmail.com",
        from: "noreply@nestjs.com",
        subject: "Verficiaction Code",
        template: "code",
        context: {
          code: code,
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
