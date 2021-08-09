import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@admin/access/user/user.service';
import { UserModule } from '@admin/access/user/user.module';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    service = module.get<UserService>(UserService);
    service.onModuleInit();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be defined', async () => {
    const data = await service.findAll();
    expect(data).toBeDefined();
    expect(typeof data.length === 'number').toBeTruthy();
  });
});
