import {Body, Controller, Get, Post, UnauthorizedException} from '@nestjs/common';

import { AppService } from './app.service';
import {LoginUserDto} from "./dto/userlogin.dto";
import {CreateUserDto} from "./dto/usercreate.dto";
import {generateToken} from "./utils/authUtils";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto ) {
    const user = await this.appService.findUserByEmailAndPassword(
      loginUserDto.email,
      loginUserDto.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      token: generateToken(user)
    };
  }

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto ) {
    return await this.appService.create(createUserDto);
  }
}
