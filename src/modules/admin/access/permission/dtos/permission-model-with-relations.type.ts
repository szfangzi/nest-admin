import {
  Menu as MenuModel,
  Permission as PermissionModel,
  Operation as OperationModel,
  PageElement as PageElementModel,
} from '@prisma/client';

export type PermissionModelWithRelations = PermissionModel & {
  menu?: MenuModel;
  operation?: OperationModel;
  element?: PageElementModel;
};
