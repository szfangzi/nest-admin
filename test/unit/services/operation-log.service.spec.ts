import { Test, TestingModule } from '@nestjs/testing';
import { OperationLogService } from '@admin/operation-log/operation-log.service';
import { CreateOperationLogDto } from '@admin/operation-log/dto';

const createCreateOperationLogDtoForTest = () => {
  const now = Date.now();
  const dto = new CreateOperationLogDto();
  dto.remark = `备注-${now}`;
  dto.businessType = 'shulou';
  dto.businessId = 1;
  dto.operator = {
    connect: {
      id: 5,
    },
  };
  dto.operation = {
    connect: {
      id: 1,
    },
  };
  return dto;
};

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
  it('create & findOne', async () => {
    const dto = createCreateOperationLogDtoForTest();
    const createData = await service.create(dto);
    expect(createData).toBeDefined();
    const findOneData = await service.findOne(createData.id);
    expect(findOneData).toBeDefined();
    expect(createData.remark).toBe(findOneData.remark);
    expect(dto.operator.connect.id).toBe(findOneData.operator.id);
    expect(dto.operation.connect.id).toBe(findOneData.operation.id);
  });

  it('findAll', async () => {
    const data = await service.findAll();
    expect(data).toBeDefined();
    expect(typeof data.length === 'number').toBeTruthy();
  });

  it('pagination', async () => {
    const data = await service.pagination({ current: 1, pageSize: 10 });
    expect(data).toBeDefined();
    expect(typeof data.totalRecords === 'number').toBeTruthy();
    expect(typeof data.totalPages === 'number').toBeTruthy();
    expect(typeof data.results.length === 'number').toBeTruthy();
  });
});
