import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BuyerItemDocument = BuyerItem & Document;

@Schema()
export class BuyerItem {
  @Prop()
  name: string;

  @Prop()
  price: string;

  @Prop()
  qty: number;

  @Prop()
  seller: string;

  @Prop()
  buyer: string;
}

export const BuyerItemSchema = SchemaFactory.createForClass(BuyerItem);
