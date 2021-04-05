import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./user";

@Table({ timestamps: true, tableName: "post", freezeTableName: true })
export default class Post extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column({ type: DataType.TEXT })
  content: string;

  @BelongsTo(() => User)
  user: User;
}
