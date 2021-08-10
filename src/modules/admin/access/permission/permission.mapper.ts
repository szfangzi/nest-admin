import { PermissionDto } from './dtos/index';
import { Permission as PermissionModel } from '@prisma/client';
import { MenuMapper } from '../../menu/menu.mapper';
import { PermissionModelWithRelations } from './dtos/permission-model-with-relations.type';
import { OperationMapper } from '../../operation/operation.mapper';
import { PageElementMapper } from '../../pageElement/page-element.mapper';
import { RoleResponseDto } from '@admin/access/role/dtos';
import { MenuDto } from '@admin/menu/dtos/menu.dto';
import { PermissionType } from '@admin/access/permission/permission-type.enum';
import { RouteDto } from '@admin/menu/dtos/route.dto';
import { PageElementResponseDto } from '@admin/pageElement/dtos/page-element-response.dto';

export class PermissionMapper {
  static toDto(permission: PermissionModel): PermissionDto {
    const dto = new PermissionDto();

    dto.id = permission.id;
    dto.type = permission.type;
    return dto;
  }

  static toDtoWithRelations(
    permission: PermissionModelWithRelations,
  ): PermissionDto {
    const dto = new PermissionDto();
    dto.id = permission.id;
    dto.type = permission.type;
    if (permission.menu) dto.menu = MenuMapper.toDto(permission.menu);
    if (permission.operation)
      dto.operation = OperationMapper.toDto(permission.operation);
    if (permission.element)
      dto.pageElement = PageElementMapper.toDto(permission.element);
    return dto;
  }

  static toAccessResponseDto(roles: RoleResponseDto[]) {
    const permissions = roles.reduce(
      (permissions: PermissionDto[], roleDto: RoleResponseDto) => {
        if (roleDto.permissions)
          roleDto.permissions.forEach((rolePermission) => {
            if (
              !permissions.find(
                (permission) => permission.id === rolePermission.id,
              )
            ) {
              permissions.push(rolePermission);
            }
          });
        return permissions;
      },
      [],
    );
    const menus: MenuDto[] = permissions
      .filter((permission) => permission.type === PermissionType.Menu)
      .map((permission) => Object.assign({}, permission.menu));
    const routes: RouteDto[] = MenuMapper.toRoutes(menus);
    const operations = permissions
      .filter((permission) => permission.type === PermissionType.Operation)
      .map((permission) =>
        OperationMapper.permissionDtoToResponseDto(permission),
      );
    const pageElements: PageElementResponseDto[] = permissions
      .filter((permission) => permission.type === PermissionType.Element)
      .map((permission) =>
        PageElementMapper.permissionDtoToResponseDto(permission),
      );
    return {
      routes,
      operations,
      pageElements,
    };
  }
}
