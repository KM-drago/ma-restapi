import { BadRequestException, Body, Controller, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { CardPayment, ItemDto } from './dto/cardPayment.dto';
import { MobilePayment } from './dto/mobilePayment.dto';

import axios from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('card')
  async cardPayment(@Body() cardPD: CardPayment) {
    if (cardPD.amount && cardPD.ccNo && cardPD.cvc && cardPD.cardHolderName) {
      let actualItemList = await axios.get(
        'http://localhost:3333/api/seller/item/find-all',
        { responseType: 'json' }
      );
      actualItemList = actualItemList.data;

      for (let i = 0; i < cardPD.itemList.length; i++) {
        this.makeTransaction(
          cardPD.itemList[i],
          actualItemList,
          cardPD.buyerUsername
        );
      }
      axios.get(
        'http://localhost:6666/api/mail-sms/mail/send/paymentConfirmation/' +
          cardPD.buyerUsername,
        {
          responseType: 'json',
        }
      );

      return this.appService.getCardPayment();
    } else {
      throw new BadRequestException();
    }
  }

  @Post('mobile')
  async mobilePayment(@Body() mobilePD: MobilePayment) {
    if (mobilePD.amount && mobilePD.mobileNo && mobilePD.pinNo) {
      let actualItemList = await axios.get(
        'http://localhost:3333/api/seller/item/find-all',
        { responseType: 'json' }
      );
      actualItemList = actualItemList.data;

      for (let i = 0; i < mobilePD.itemList.length; i++) {
        this.makeTransaction(
          mobilePD.itemList[i],
          actualItemList,
          mobilePD.buyerUsername
        );
      }
      axios.get('http://localhost:6666/api/mail-sms/sms/send/:teleno', {
        responseType: 'json',
      });
      return this.appService.getMobilePayment();
    } else {
      throw new BadRequestException();
    }
  }

  makeTransaction(
    element: ItemDto,
    actualItemList: any,
    buyerUsername: string
  ) {
    for (let i = 0; i < actualItemList.length; i++) {
      if (element.id == actualItemList[i]._id) {
        let itemToUpdateSeller = actualItemList[i];
        itemToUpdateSeller.qty = actualItemList[i].qty - element.qty;
        axios.patch(
          'http://localhost:3333/api/seller/item/update',
          itemToUpdateSeller,
          {
            responseType: 'json',
          }
        );

        const buyerCreateObj = {
          name: element.name,
          price: element.price,
          qty: element.qty,
          seller: actualItemList[i].seller,
          buyer: buyerUsername,
        };

        element = { ...element };

        axios.post(
          'http://localhost:7777/api/buyer/buyer-item/create',
          buyerCreateObj,
          {
            responseType: 'json',
          }
        );
      }
    }
  }
}
