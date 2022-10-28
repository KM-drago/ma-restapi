import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { AppService } from './app.service';

import nodemailer = require('nodemailer');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('sms/send/:teleno')
  sendSMS(@Param('teleno') teleNo: string) {
    console.log('smsSent');

    if (teleNo != ':teleno') {
      return { message: 'SMS sent' };
    } else {
      throw new BadRequestException();
    }
  }

  @Get('mail/send/paymentConfirmation/:mail')
  async sendMail(@Param('mail') mail: string) {
    console.log('mailSent');

    const passwd = 'not_set';
    if (passwd == 'not_set') {
      return { mail: 'sent successfully ' };
    }
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'cs27.pg.platform@gmail.com',
        pass: passwd, //replace this with the actual password that is pinned in telegram
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"restAPIshopping" <buy@restAPIshopping.com>', // sender address
      to: mail, // list of receivers
      subject: 'Payment confirmation.', // Subject line
      text: 'Your payment is confirmed and your item will arrive in due time.', // plain text body
      html: '<b>Your payment is confirmed and your item will arrive in due time.</b>', // html body
    });

    return info;
  }
}
