import * as bcrypt from 'bcrypt';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Role {
  Admin = 'admin',
  Customer = 'customer',
}

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ name: 'email', unique: true })
  email: string;

  @Prop({ name: 'password' })
  password: string;

  @Prop({ name: 'username', unique: true })
  username: string;

  @Prop({ name: 'firstName' })
  firstName: string;

  @Prop({ name: 'lastName' })
  lastName: string;

  @Prop({ name: 'roles' })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
