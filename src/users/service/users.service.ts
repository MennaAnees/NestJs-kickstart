import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDTO } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

export type UserType = any;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }
  private readonly users: UserType[];

  async getUser(username: string): Promise<UserType | undefined> {
    const user = await this.userModel.findOne({ username: username });
    return user;
  }

  async register(createUserDTO: CreateUserDTO): Promise<User> {
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hash(createUserDTO.password, salt);
    createUserDTO.password = hashedPassword;
    const user = await this.userModel.create(createUserDTO);
    return user;
  }
}
