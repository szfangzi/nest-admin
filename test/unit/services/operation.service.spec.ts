import { Test, TestingModule } from '@nestjs/testing';
import { OperationService } from '@admin/operation/operation.service';

describe('MenuService', () => {
  let service: OperationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperationService],
    }).compile();

    service = module.get<OperationService>(OperationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
