import { Module } from '@nestjs/common';
import { AccessModule } from '@access/access.module';
import { MenuModule } from './menu/menu.module';
import { SettingModule } from './setting/setting.module';
import { NotificationModule } from './notification/notification.module';
import { DepartmentModule } from './department/department.module';
import { JobModule } from './job/job.module';
import { OperationLogModule } from './operation-log/operation-log.module';

@Module({
  imports: [
    AccessModule,
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
