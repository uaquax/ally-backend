import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("uuid", { unique: true, default: uuidv4() })
  public _id: string;

  @Column({ nullable: true })
  public name: string;

  @Column({ nullable: true })
  public email: string;

  @Column({ nullable: true })
  public username: string;

  @Column({ default: false })
  public isActivated: boolean;

  @Column({ nullable: true })
  public password: string;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: true,
  })
  createdAt: Date;

  @Column({
    name: "last_active",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: true,
  })
  lastActive: Date;

  @Column({ nullable: true })
  public hashedRt: string;
}
