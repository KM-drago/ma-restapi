import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { BuyerItemService } from './buyer-item.service';
import { BuyerItemDto } from './dto/buyerItem.dto';

@Controller('buyer-item')
export class BuyerItemController {
  constructor(private readonly buyerItemService: BuyerItemService) {}

  @Post('create')
  async create(@Body() createItemDto: BuyerItemDto) {
    return await this.buyerItemService.create(createItemDto);
  }

  @Get('find-by-buyer/:name')
  async getAllByBuyer(@Param('name') buyer: string) {
    const item = await this.buyerItemService.findByBuyer(buyer);
    if (item.length != 0) {
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
    const item = await this.buyerItemService.delete(id);
    if (item) {
      return item;
    } else {
      throw new BadRequestException('Delete Error');
    }
  }
}
