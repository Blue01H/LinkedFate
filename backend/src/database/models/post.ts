import { Table, Model, HasOne, Column } from "sequelize-typescript";
import User from "./user";

@Table({ timestamps: true, tableName: "role", freezeTableName: true })
export default class Post extends Model {
  @HasOne(() => User)
  user: User;

  @Column
  userId: number;

  @Column
  content: Text;
}
