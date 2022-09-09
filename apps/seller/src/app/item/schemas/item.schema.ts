import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop()
  name: string;

  @Prop()
  price: string;

  @Prop()
  qty: number;

  @Prop()
  seller: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
