import { Test, TestingModule } from '@nestjs/testing';
import { BuyerItemController } from './buyer-item.controller';

describe('BuyerItemController', () => {
  let controller: BuyerItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuyerItemController],
    }).compile();

    controller = module.get<BuyerItemController>(BuyerItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
