import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@admin/access/user/user.service';
import { UserModule } from '@admin/access/user/user.module';
import { CreateUserDto } from '@admin/access/user/dtos/create-user.dto';
import { UpdateUserDto } from '@admin/access/user/dtos/update-user.dto';
import { HashHelper } from '@helpers/hash.helper';
import { UserStatus } from '@admin/access/user/user-status.enum';
import { DataNotFoundCanNotUpdatedException } from "@exceptions/data-not-found-can-not-updated.exception";
import { ErrorType, HttpErrorType } from "@exceptions/index";

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('create', async () => {
    const dto = new CreateUserDto();
    dto.name = `admin${Date.now()}`;
    dto.password = '111111';
    const data = await service.create(dto);
    expect(data).toBeDefined();
    const user = await service.findOne(data.id);
    expect(user.name).toBe(dto.name);
  });
  it('findOne', async () => {
    const dto = new CreateUserDto();
    dto.name = `admin${Date.now()}`;
    dto.password = '111111';
    const user = await service.create(dto);
    const data = await service.findOne(user.id);
    expect(data).toBeDefined();
    expect(data.name).toBe(dto.name);
  });
  it('findAll', async () => {
    const data = await service.findAll();
    expect(data).toBeDefined();
    expect(typeof data.length === 'number').toBeTruthy();
  });
  it('findAll with filter options', async () => {
    const data = await service.findAll({ status: UserStatus.Active });
    expect(data).toBeDefined();
    expect(
      data.every((item) => item.status === UserStatus.Active),
    ).toBeTruthy();

    const data2 = await service.findAll({ id: { in: [7, 8] } });
    expect(data2).toBeDefined();
    expect(data2.length).toBe(2);
  });
  it('pagination', async () => {
    const data = await service.pagination({ current: 1, pageSize: 10 });
    expect(data).toBeDefined();
    expect(typeof data.totalRecords === 'number').toBeTruthy();
    expect(typeof data.totalPages === 'number').toBeTruthy();
    expect(typeof data.results.length === 'number').toBeTruthy();
  });
  it('update', async () => {
    let user = await service.findOneByName('admin4');
    const password = Date.now().toString();
    const dto = new UpdateUserDto();
    dto.password = password;
    const data = await service.update(user.id, dto);
    expect(data).toBeDefined();
    user = await service.findOneByName('admin4');
    expect(await HashHelper.compare(password, user.password)).toBeTruthy();
  });
  it('update a not exist user', async () => {
    try {
      const id = 1;
      const dto = new UpdateUserDto();
      dto.isSuper = true;
      const data = await service.update(id, dto);
      expect(data).toBeDefined();
    } catch (err) {
      expect(err.response.error).toBe(ErrorType.DataNotFoundCannotBeUpdated);
    }
  });
  it('update without password', async () => {
    const createDto = new CreateUserDto();
    createDto.name = `admin${Date.now()}`;
    createDto.password = '111111';
    const newUser = await service.create(createDto);
    const dto = new UpdateUserDto();
    dto.status = UserStatus.Disabled;
    const data = await service.update(newUser.id, dto);
    expect(data).toBeDefined();
  });
  it('updateMany', async () => {
    const ids = [];
    for (let i = 0; i < 3; i++) {
      const dto = new CreateUserDto();
      dto.name = `admin${Date.now()}`;
      dto.password = '111111';
      const user = await service.create(dto);
      ids[i] = user.id;
    }
    const dto = new UpdateUserDto();
    dto.password = '222222';
    dto.isSuper = true;
    dto.status = UserStatus.Disabled;
    const data = await service.updateMany(ids, dto);
    expect(data).toBeDefined();
    const users = await service.findAll({ id: { in: ids } });
    expect(users.every((user) => user.isSuper)).toBeTruthy();
    expect(
      users.every((user) => user.status === UserStatus.Disabled),
    ).toBeTruthy();
    expect(
      users.every((user) => HashHelper.compare(dto.password, user.password)),
    ).toBeTruthy();
  });
  it('updateMany without password', async () => {
    const ids = [];
    for (let i = 0; i < 3; i++) {
      const dto = new CreateUserDto();
      dto.name = `admin${Date.now()}`;
      dto.password = '111111';
      const user = await service.create(dto);
      ids[i] = user.id;
    }
    const dto = new UpdateUserDto();
    dto.status = UserStatus.Disabled;
    const data = await service.updateMany(ids, dto);
    expect(data).toBeDefined();
  });
  it('remove', async () => {
    const dto = new CreateUserDto();
    dto.name = `admin${Date.now()}`;
    dto.password = '111111';
    const newUser = await service.create(dto);
    expect(newUser).toBeDefined();
    const data = await service.remove(newUser.id);
    expect(data).toBeDefined();
    const user = await service.findOneByName(dto.name);
    expect(data.deletedAt).toBeDefined();
    expect(user.deletedAt).toBeDefined();
  });
  it('remove a not exist user', async () => {
    try {
      const data = await service.remove(1);
      expect(data).toBeDefined();
    } catch (err) {
      expect(err.response.error).toBe(ErrorType.DataNotFoundCannotBeDeleted);
    }
  });
  it('removeMany', async () => {
    const ids = [],
      count = 3;
    for (let i = 0; i < count; i++) {
      const dto = new CreateUserDto();
      dto.name = `admin${Date.now()}`;
      dto.password = '111111';
      const user = await service.create(dto);
      ids[i] = user.id;
    }
    const data = await service.removeMany(ids);
    expect(data.count).toBe(count);
    const users = await service.findAll({ id: { in: ids } });
    expect(users.every((user) => user.deletedAt)).toBeTruthy();
  });
  it('findUserWithRelations', async () => {
    const data = await service.findUserWithRelations(4);
    expect(data).toBeDefined();
    expect(data.roles).toBeDefined();
    expect(data.roles.length).toBeGreaterThan(0);
    expect(data.roles[0].permissions).toBeDefined();
    expect(data.roles[0].permissions.length).toBeGreaterThan(0);
    expect(data.roles[0].permissions[0].id).toBeDefined();
  });
});
