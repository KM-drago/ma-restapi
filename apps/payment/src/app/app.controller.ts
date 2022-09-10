import { BadRequestException, Body, Controller, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { CardPayment } from './dto/cardPayment.dto';
import { MobilePayment } from './dto/mobilePayment.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('card')
  cardPayment(@Body() cardPD: CardPayment) {
    if (cardPD.amount && cardPD.ccNo && cardPD.cvc && cardPD.cardHolderName) {
      return this.appService.getCardPayment();
    } else {
      throw new BadRequestException();
    }
  }

  @Post('mobile')
  mobilePayment(@Body() mobilePD: MobilePayment) {
    if (mobilePD.amount && mobilePD.mobileNo && mobilePD.pinNo) {
      return this.appService.getMobilePayment();
    } else {
      throw new BadRequestException();
    }
  }
}
