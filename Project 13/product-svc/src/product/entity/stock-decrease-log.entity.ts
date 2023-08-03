import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class StockDecreaseLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  /*
   * Relation IDs
   */

  @Column({ type: "integer" })
  orderId!: number;

  /*
   * Many-To-One Relationships
   */

  @ManyToOne(() => Product, (product) => product.stockDecreaseLogs)
  product: Product;
}
