import { Test, TestingModule } from '@nestjs/testing';
import { OperationLogService } from '@admin/operation-log/operation-log.service';

describe('OperationLogService', () => {
  let service: OperationLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperationLogService],
    }).compile();

    service = module.get<OperationLogService>(OperationLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
