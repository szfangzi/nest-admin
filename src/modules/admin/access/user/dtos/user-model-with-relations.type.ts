import {
  Menu as MenuModel,
  User as UserModel,
  Operation as OperationModel,
  PageElement as PageElementModel,
} from '@prisma/client';

export type UserModelWithRelations = UserModel & {
  roles: Array<{
    id: number;
    name: string;
    permissions?: {
      id: number;
      type: string;
      menu?: MenuModel;
      operation?: OperationModel;
      element?: PageElementModel;
    }[];
  }>;
};
