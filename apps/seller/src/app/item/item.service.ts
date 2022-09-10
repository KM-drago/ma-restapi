import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemDto } from './dto/item.dto';
import { Item, ItemDocument } from './schemas/item.schema';

@Injectable()
export class ItemService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

  async create(createItemDto: ItemDto): Promise<Item> {
    const createdItem = new this.itemModel(createItemDto);
    return createdItem.save();
  }

  async UpdateItem(id: string, item: Item): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate(id, item, {
      returnOriginal: false,
    });
  }

  async findAll(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  async findOneByName(name: string): Promise<Item> {
    return this.itemModel.findOne({ name: name }).exec();
  }

  async findBySeller(seller: string): Promise<any> {
    return this.itemModel.find({ seller: seller }).exec();
  }

  async delete(id: string): Promise<Item> {
    const deletedItem = await this.itemModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedItem;
  }
}
