import { Module } from '@nestjs/common';
import { UserModule } from '@admin/access/user/user.module';
import { PermissionModule } from '@admin/access/permission/permission.module';
import { RoleModule } from '@admin/access/role/role.module';
import { MenuModule } from './menu/menu.module';
import { SettingModule } from './setting/setting.module';
import { NotificationModule } from './notification/notification.module';
import { DepartmentModule } from './department/department.module';
import { JobModule } from './job/job.module';
import { OperationLogModule } from './operation-log/operation-log.module';

@Module({
  imports: [
    UserModule,
    PermissionModule,
    RoleModule,
    // OperationLogModule,
    // MenuModule,
    // SettingModule,
    // LogModule,
    // NotificationModule,
    // DepartmentModule,
    // JobModule,
  ],
})
export class AdminModule {}
