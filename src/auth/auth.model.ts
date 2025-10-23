import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'auth' })
export class Auth extends Model<Auth> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;
}
