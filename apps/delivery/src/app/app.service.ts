import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  setDeliveryData(): { message: string } {
    return { message: 'Delivery data set' };
  }
}
