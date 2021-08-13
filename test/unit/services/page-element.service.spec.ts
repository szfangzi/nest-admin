import { Test, TestingModule } from '@nestjs/testing';
import { PageElementService } from '@admin/page-element/page-element.service';
import { ErrorType } from '@exceptions/index';
import { CreatePermissionDto } from '@admin/access/permission/dtos';
import { PermissionType } from '@admin/access/permission/permission-type.enum';
import { CreatePageElementDto } from '@admin/page-element/dtos/create-page-element.dto';
import { UpdatePageElementDto } from '@admin/page-element/dtos/update-page-element.dto';

const createCreatePageElementDtoForTest = () => {
  const now = Date.now();
  const permissionDto = new CreatePermissionDto();
  permissionDto.type = PermissionType.Element;
  const dto = new CreatePageElementDto();
  dto.name = `按钮-${now}`;
  dto.code = `pageElementManage.submit-${now}`;
  dto.permission = {
    create: permissionDto,
  };
  return dto;
};
const createUpdatePageElementDtoForTest = () => {
  const now = Date.now();
  const dto = new UpdatePageElementDto();
  dto.name = `按钮-${now}`;
  return dto;
};

describe('PageElementService', () => {
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
  it('create & findOne', async () => {
    const dto = createCreatePageElementDtoForTest();
    const createData = await service.create(dto);
    expect(createData).toBeDefined();
    const findOneData = await service.findOne(createData.id);
    expect(findOneData).toBeDefined();
    expect(createData.code).toBe(findOneData.code);
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
    const newPageElementDto = createCreatePageElementDtoForTest();
    const pageElement = await service.create(newPageElementDto);
    const dto = createUpdatePageElementDtoForTest();
    const data = await service.update(pageElement.id, dto);
    expect(data).toBeDefined();
    const findOneData = await service.findOne(pageElement.id);
    expect(data).toBeDefined();
    expect(findOneData.name).toBe(dto.name);
  });
  //
  it('update a not exist record', async () => {
    try {
      const id = 0;
      const dto = createUpdatePageElementDtoForTest();
      const data = await service.update(id, dto);
      expect(data).toBeDefined();
    } catch (err) {
      expect(err.response.error).toBe(ErrorType.DataNotFound);
    }
  });

  it('updateMany', async () => {
    const ids = [];
    for (let i = 0; i < 3; i++) {
      const dto = createCreatePageElementDtoForTest();
      const newData = await service.create(dto);
      ids.push(newData.id);
    }
    const dto = createUpdatePageElementDtoForTest();
    const data = await service.updateMany(ids, dto);
    expect(data).toBeDefined();
    const pageElements = await service.findAll({ id: { in: ids } });
    expect(
      pageElements.every((pageElement) => pageElement.name === dto.name),
    ).toBeTruthy();
  });

  it('remove', async () => {
    const dto = createCreatePageElementDtoForTest();
    const newPageElement = await service.create(dto);
    expect(newPageElement).toBeDefined();
    const data = await service.remove(newPageElement.id);
    expect(data).toBeDefined();
    const pageElement = await service.findOne(newPageElement.id);
    expect(data.deletedAt).toBeDefined();
    expect(pageElement.deletedAt).toBeDefined();
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
      const dto = createCreatePageElementDtoForTest();
      const pageElement = await service.create(dto);
      ids[i] = pageElement.id;
    }
    const data = await service.removeMany(ids);
    expect(data.count).toBe(count);
    const pageElements = await service.findAll({ id: { in: ids } });
    expect(
      pageElements.every((pageElement) => pageElement.deletedAt),
    ).toBeTruthy();
  });
});
