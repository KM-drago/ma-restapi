import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getCardPayment(): { message: string } {
    return { message: 'Card payment successful' };
  }

  getMobilePayment(): { message: string } {
    return { message: 'Mobile payment successful' };
  }
}
