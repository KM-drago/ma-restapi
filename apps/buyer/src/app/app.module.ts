import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuyerItemModule } from './buyer-item/buyer-item.module';

@Module({
  imports: [
    BuyerItemModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:fyDl5TP8g8DGc25G@buyer-ma-restapi.hduubm1.mongodb.net/?retryWrites=true&w=majority'
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
