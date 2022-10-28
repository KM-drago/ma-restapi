import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
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

  @Post('update')
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
    return this.itemService.findAll();
  }

  @Get('find-by-seller/:name')
  async getAllBySeller(@Param('name') seller: string) {
    const item = await this.itemService.findBySeller(seller);
    if (item.length != 0) {
      return item;
    } else {
      throw new NotFoundException();
    }
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

  @Get('delete/:id')
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
