import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "orders" })
export class Order {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

}