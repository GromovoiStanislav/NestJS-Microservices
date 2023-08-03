import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  price!: number;

  /*
   * Relation IDs
   */

  @Column({ type: "integer" })
  productId!: number;

  @Column({ type: "integer" })
  userId!: number;
}
