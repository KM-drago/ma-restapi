import { Test, TestingModule } from '@nestjs/testing';
import { BuyerItemService } from './buyer-item.service';

describe('BuyerItemService', () => {
  let service: BuyerItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuyerItemService],
    }).compile();

    service = module.get<BuyerItemService>(BuyerItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
