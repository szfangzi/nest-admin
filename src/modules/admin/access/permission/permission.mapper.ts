import { Permission as PermissionModel } from '@prisma/client';
import { MenuMapper } from '../../menu/menu.mapper';
import { PermissionModelWithRelations } from './dtos/permission-model-with-relations.type';
import { OperationMapper } from '../../operation/operation.mapper';
import { PageElementMapper } from '../../page-element/page-element.mapper';
import { RoleResponseDto } from '@admin/access/role/dtos';
import { MenuResponseDto } from '@admin/menu/dtos/menu-response.dto';
import { PermissionType } from '@admin/access/permission/permission-type.enum';
import { RouteDto } from '@admin/menu/dtos/route.dto';
import { PageElementResponseDto } from '@admin/page-element/dtos/page-element-response.dto';
import { PermissionResponseDto } from '@admin/access/permission/dtos';

export class PermissionMapper {
  static toDto(permission: PermissionModel): PermissionResponseDto {
    const dto = new PermissionResponseDto();

    dto.id = permission.id;
    dto.type = permission.type;
    return dto;
  }

  static toDtoWithRelations(
    permission: PermissionModelWithRelations,
  ): PermissionResponseDto {
    const dto = new PermissionResponseDto();
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
      (permissions: PermissionResponseDto[], roleDto: RoleResponseDto) => {
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
    const menus: MenuResponseDto[] = permissions
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
