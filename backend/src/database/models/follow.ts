import {
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  Column,
} from "sequelize-typescript";
import User from "./user";

@Table({ timestamps: true, tableName: "follow", freezeTableName: true })
export default class Follow extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => User)
  @Column
  followId: number;

  @BelongsTo(() => User)
  user: User;
}
