import { Test, TestingModule } from '@nestjs/testing';
import { OperationService } from '@admin/operation/operation.service';
import { ErrorType } from '@exceptions/index';
import { CreatePermissionDto } from '@admin/access/permission/dtos';
import { PermissionType } from '@admin/access/permission/permission-type.enum';
import { CreateOperationDto, UpdateOperationDto } from '@admin/operation/dtos';

const createCreateOperationDtoForTest = () => {
  const now = Date.now();
  const permissionDto = new CreatePermissionDto();
  permissionDto.type = PermissionType.Operation;
  const dto = new CreateOperationDto();
  dto.method = `GET`;
  dto.name = `接口-${now}`;
  dto.path = `/users/${now}`;
  dto.permission = {
    create: permissionDto,
  };
  return dto;
};
const createUpdateOperationDtoForTest = () => {
  const now = Date.now();
  const dto = new UpdateOperationDto();
  dto.name = `接口-${now}`;
  return dto;
};

describe('OperationService', () => {
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
  it('create & findOne', async () => {
    const dto = createCreateOperationDtoForTest();
    const createData = await service.create(dto);
    expect(createData).toBeDefined();
    const findOneData = await service.findOne(createData.id);
    expect(findOneData).toBeDefined();
    expect(createData.path).toBe(findOneData.path);
    expect(createData.name).toBe(findOneData.name);
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

  it('update', async () => {
    const newOperationDto = createCreateOperationDtoForTest();
    const operation = await service.create(newOperationDto);
    const dto = createUpdateOperationDtoForTest();
    const data = await service.update(operation.id, dto);
    expect(data).toBeDefined();
    const findOneData = await service.findOne(operation.id);
    expect(data).toBeDefined();
    expect(findOneData.name).toBe(dto.name);
  });
  //
  it('update a not exist record', async () => {
    try {
      const id = 0;
      const dto = createUpdateOperationDtoForTest();
      const data = await service.update(id, dto);
      expect(data).toBeDefined();
    } catch (err) {
      expect(err.response.error).toBe(ErrorType.DataNotFound);
    }
  });

  it('updateMany', async () => {
    const ids = [];
    for (let i = 0; i < 3; i++) {
      const dto = createCreateOperationDtoForTest();
      const newData = await service.create(dto);
      ids.push(newData.id);
    }
    const dto = createUpdateOperationDtoForTest();
    const data = await service.updateMany(ids, dto);
    expect(data).toBeDefined();
    const operations = await service.findAll({ id: { in: ids } });
    expect(
      operations.every((operation) => operation.name === dto.name),
    ).toBeTruthy();
  });

  it('remove', async () => {
    const dto = createCreateOperationDtoForTest();
    const newOperation = await service.create(dto);
    expect(newOperation).toBeDefined();
    const data = await service.remove(newOperation.id);
    expect(data).toBeDefined();
    const operation = await service.findOne(newOperation.id);
    expect(data.deletedAt).toBeDefined();
    expect(operation.deletedAt).toBeDefined();
  });

  it('remove a not exist page element', async () => {
    try {
      await service.remove(0);
    } catch (err) {
      expect(err.response.error).toBe(ErrorType.DataNotFound);
    }
  });

  it('removeMany', async () => {
    const ids = [],
      count = 3;
    for (let i = 0; i < count; i++) {
      const dto = createCreateOperationDtoForTest();
      const operation = await service.create(dto);
      ids[i] = operation.id;
    }
    const data = await service.removeMany(ids);
    expect(data.count).toBe(count);
    const operations = await service.findAll({ id: { in: ids } });
    expect(operations.every((operation) => operation.deletedAt)).toBeTruthy();
  });
});
