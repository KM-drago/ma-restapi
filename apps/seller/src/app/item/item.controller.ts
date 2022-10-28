import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ItemDto } from './dto/item.dto';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('create')
  async create(@Body() createItemDto: ItemDto) {
    return await this.itemService.create(createItemDto);
  }

  @Patch('update')
  async update(@Body() updateItemDto: any) {
    const updatedItem = await this.itemService.UpdateItem(
      updateItemDto._id,
      updateItemDto
    );
    if (updatedItem) {
      return updatedItem;
    } else {
      throw new BadRequestException('Update Error');
    }
  }

  @Get('find-all')
  async findAll() {
    const item = await this.itemService.findAll();
    let filteredItemArr = this.filterItemArr(item);
    if (filteredItemArr.length != 0) {
      return filteredItemArr;
    } else {
      throw new NotFoundException();
    }
  }

  @Get('find-by-seller/:name')
  async getAllBySeller(@Param('name') seller: string) {
    const item = await this.itemService.findBySeller(seller);
    let filteredItemArr = this.filterItemArr(item);
    if (filteredItemArr.length != 0) {
      return filteredItemArr;
    } else {
      throw new NotFoundException();
    }
  }

  filterItemArr(itemArr: any) {
    let filteredItemArr = [];
    for (let i = 0; i < itemArr.length; i++) {
      if (itemArr[i].qty > 0) {
        filteredItemArr.push(itemArr[i]);
      }
    }
    return filteredItemArr;
  }

  @Get('find-by-name/:name')
  async getAll(@Param('name') name: string) {
    const item = await this.itemService.findOneByName(name);
    if (item) {
      return item;
    } else {
      throw new NotFoundException();
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    if (id == ':id') {
      throw new BadRequestException('Enter id');
    }
    const item = await this.itemService.delete(id);
    if (item) {
      return item;
    } else {
      throw new BadRequestException('Delete Error');
    }
  }
}
