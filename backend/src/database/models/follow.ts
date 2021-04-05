import { Table, Model, HasOne, Column } from "sequelize-typescript";
import User from "./user";

@Table({ timestamps: true, tableName: "role", freezeTableName: true })
export default class Follow extends Model {
  @HasOne(() => User)
  user: User;

  @Column
  userId: number;

  @HasOne(() => User)
  follow: User;

  @Column
  followId: number;
}
