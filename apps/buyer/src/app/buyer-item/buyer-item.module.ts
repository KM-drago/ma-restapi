import { Module } from '@nestjs/common';
import { BuyerItemService } from './buyer-item.service';
import { BuyerItemController } from './buyer-item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BuyerItem, BuyerItemSchema } from './schemas/buyerItem.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BuyerItem.name, schema: BuyerItemSchema },
    ]),
  ],
  providers: [BuyerItemService],
  controllers: [BuyerItemController],
})
export class BuyerItemModule {}
