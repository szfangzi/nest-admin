import { Menu as MenuModel } from '@prisma/client';
import { MenuDto } from './dtos/menu.dto';
import { RouteDto } from './dtos/route.dto';
import { Logger } from '@nestjs/common';

export class MenuMapper {
  static toDto(menu: MenuModel): MenuDto {
    const dto = new MenuDto();
    dto.id = menu.id;
    dto.routeName = menu.routeName;
    dto.componentPath = menu.componentPath;
    dto.name = menu.name;
    dto.path = menu.path;
    dto.redirect = menu.redirect;
    dto.title = menu.title;
    dto.icon = menu.icon;
    dto.parentId = menu.parentId;
    if (!menu.parentId) dto.children = [];
    return dto;
  }

  static toRouteDto(menuDto: MenuDto): RouteDto {
    const routeDto = new RouteDto();
    routeDto.routeName = menuDto.routeName;
    routeDto.componentPath = menuDto.componentPath;
    routeDto.name = menuDto.name;
    if (menuDto.redirect) routeDto.redirect = menuDto.redirect;
    routeDto.hidden = menuDto.hidden;
    routeDto.meta = {};
    if (menuDto.title) routeDto.meta.title = menuDto.title;
    if (menuDto.icon) routeDto.meta.icon = menuDto.icon;
    if (Array.isArray(menuDto.children) && menuDto.children.length > 0)
      routeDto.children = menuDto.children.map(MenuMapper.toRouteDto);
    return routeDto;
  }

  static toRoutes(menus: MenuDto[]): RouteDto[] {
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i];
      if (menu.parentId) {
        const parentMenu = menus.find(
          (parentMenu) => parentMenu.id === menu.parentId,
        );
        if (parentMenu) {
          parentMenu.children.push(menu);
        }
      }
    }
    return menus
      .filter((menu) => !menu.parentId)
      .map((menu) => {
        return MenuMapper.toRouteDto(menu);
      });
  }
}
