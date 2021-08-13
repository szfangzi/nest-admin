import { Test, TestingModule } from '@nestjs/testing';
import { MenuService } from '@admin/menu/menu.service';
import { CreateMenuDto } from '@admin/menu/dtos/create-menu.dto';
import {
  CreatePermissionDto,
  PermissionDto,
} from '@admin/access/permission/dtos';
import { PermissionType } from '@admin/access/permission/permission-type.enum';
import { UpdateMenuDto } from '@admin/menu/dtos';
import { ErrorType } from '@exceptions/index';

const createCreateMenuDtoForTest = () => {
  const now = Date.now();
  const permissionDto = new CreatePermissionDto();
  permissionDto.type = PermissionType.Menu;
  const dto = new CreateMenuDto();
  dto.title = `用户管理-${now}`;
  dto.routeName = `userManage-${now}`;
  dto.path = `/users/${now}`;
  dto.permission = {
    create: permissionDto,
  };
  return dto;
};
const createUpdateMenuDtoForTest = () => {
  const now = Date.now();
  const dto = new UpdateMenuDto();
  dto.title = `用户管理-${now}`;
  dto.routeName = `userManage-${now}`;
  dto.path = `/users/${now}`;
  return dto;
};

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuService],
    }).compile();

    service = module.get<MenuService>(MenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create & findOne', async () => {
    const dto = createCreateMenuDtoForTest();
    const menu = await service.create(dto);
    const menu2 = await service.findOne(menu.id);
    expect(menu2).toBeDefined();
    expect(menu2.path).toBe(dto.path);
    expect(menu2.permission.id).toBe(menu.permission.id);
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
    const newMenuDto = createCreateMenuDtoForTest();
    const menu = await service.create(newMenuDto);
    const dto = createUpdateMenuDtoForTest();
    const data = await service.update(menu.id, dto);
    expect(data).toBeDefined();
    const findOneData = await service.findOne(menu.id);
    expect(data).toBeDefined();
    expect(findOneData.path).toBe(dto.path);
  });

  it('update a not exist record', async () => {
    try {
      const id = 0;
      const dto = createUpdateMenuDtoForTest();
      const data = await service.update(id, dto);
      expect(data).toBeDefined();
    } catch (err) {
      expect(err.response.error).toBe(ErrorType.DataNotFound);
    }
  });

  it('updateMany', async () => {
    const ids = [];
    for (let i = 0; i < 3; i++) {
      const dto = createCreateMenuDtoForTest();
      const newData = await service.create(dto);
      ids.push(newData.id);
    }
    const dto = new UpdateMenuDto();
    dto.title = '111';
    dto.componentPath = '/111';
    const data = await service.updateMany(ids, dto);
    expect(data).toBeDefined();
    const menus = await service.findAll({ id: { in: ids } });
    expect(
      menus.every((menu) => menu.componentPath === dto.componentPath),
    ).toBeTruthy();
    expect(menus.every((menu) => menu.title === dto.title)).toBeTruthy();
  });

  it('remove', async () => {
    const dto = createCreateMenuDtoForTest();
    const newUser = await service.create(dto);
    expect(newUser).toBeDefined();
    const data = await service.remove(newUser.id);
    expect(data).toBeDefined();
    const user = await service.findOne(newUser.id);
    expect(data.deletedAt).toBeDefined();
    expect(user.deletedAt).toBeDefined();
  });

  it('remove a not exist user', async () => {
    try {
      await service.remove(1);
    } catch (err) {
      expect(err.response.error).toBe(ErrorType.DataNotFound);
    }
  });

  it('removeMany', async () => {
    const ids = [],
      count = 3;
    for (let i = 0; i < count; i++) {
      const dto = createCreateMenuDtoForTest();
      const user = await service.create(dto);
      ids[i] = user.id;
    }
    const data = await service.removeMany(ids);
    expect(data.count).toBe(count);
    const users = await service.findAll({ id: { in: ids } });
    expect(users.every((user) => user.deletedAt)).toBeTruthy();
  });
});
