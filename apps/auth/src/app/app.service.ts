import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from "mongoose";
import {CreateUserDto} from "./dto/usercreate.dto";

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {}

  getData(): { message: string } {
    return { message: 'Welcome to auth!' };
  }

  async findUserByEmailAndPassword(email: string, password: string): Promise<User> {
    return await this.userModel.findOne({
      email: email,
      password: password,
    }).exec();
  }

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
}
