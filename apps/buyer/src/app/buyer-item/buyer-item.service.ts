import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BuyerItemDto } from './dto/buyerItem.dto';
import { BuyerItem, BuyerItemDocument } from './schemas/buyerItem.schema';

@Injectable()
export class BuyerItemService {
  constructor(
    @InjectModel(BuyerItem.name)
    private buyerItemModel: Model<BuyerItemDocument>
  ) {}

  async create(createItemDto: BuyerItemDto): Promise<BuyerItem> {
    const createdItem = new this.buyerItemModel(createItemDto);
    return createdItem.save();
  }

  async findByBuyer(buyer: string): Promise<any> {
    return this.buyerItemModel.find({ buyer: buyer }).exec();
  }

  async delete(id: string): Promise<BuyerItem> {
    const deletedItem = await this.buyerItemModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedItem;
  }
}
