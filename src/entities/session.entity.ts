import { config } from "dotenv";
import { Entity } from "typeorm";

config();

@Entity({ name: "sessions" })
export class Session {
}
