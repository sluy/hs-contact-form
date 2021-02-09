import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity({ name: "messages" })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  company: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  phone: string;

  @Column({ length: 255 })
  category: string;

  @Column({ length: 1000 })
  value: string;
}
