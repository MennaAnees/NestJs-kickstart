import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';

export type UserType = any;

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    private readonly users: UserType[];

    async getUser(username: string): Promise<UserType | undefined> {
      const user = await this.userModel.findOne({username:username});
      return user;
    }

    async register(createCatDto: CreateUserDTO): Promise<User> {
      const user = new this.userModel(createCatDto);
      return user.save();
    }
}
