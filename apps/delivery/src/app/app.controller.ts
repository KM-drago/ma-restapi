import { BadRequestException, Body, Controller, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { DeliveryData } from './dto/deliveryData.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  setDeliveryData(@Body() deliveryData: DeliveryData) {
    if (deliveryData.location && deliveryData.username) {
      return this.appService.setDeliveryData();
    } else {
      throw new BadRequestException();
    }
  }
}
