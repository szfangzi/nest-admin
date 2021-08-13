import { Test, TestingModule } from '@nestjs/testing';
import { ShulouService } from './shulou.service';

describe('ShulouService', () => {
  let service: ShulouService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShulouService],
    }).compile();

    service = module.get<ShulouService>(ShulouService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
