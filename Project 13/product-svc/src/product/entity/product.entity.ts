import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StockDecreaseLog } from "./stock-decrease-log.entity";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" })
  sku!: string;

  @Column({ type: "integer" })
  stock!: number;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  price!: number;

  /*
   * One-To-Many Relationships
   */

  @OneToMany(() => StockDecreaseLog, (stockDecreaseLog) => stockDecreaseLog.product)
  stockDecreaseLogs: StockDecreaseLog[];
}
