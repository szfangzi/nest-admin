import { Test, TestingModule } from '@nestjs/testing';
import { PageElementService } from '@admin/pageElement/page-element.service';

describe('MenuService', () => {
  let service: PageElementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageElementService],
    }).compile();

    service = module.get<PageElementService>(PageElementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
