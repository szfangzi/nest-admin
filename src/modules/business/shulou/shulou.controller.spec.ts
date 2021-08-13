import { Test, TestingModule } from '@nestjs/testing';
import { ShulouController } from './shulou.controller';
import { ShulouService } from './shulou.service';

describe('ShulouController', () => {
  let controller: ShulouController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShulouController],
      providers: [ShulouService],
    }).compile();

    controller = module.get<ShulouController>(ShulouController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
