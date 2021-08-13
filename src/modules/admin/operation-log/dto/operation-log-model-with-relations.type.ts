import {
  OperationLog as OperationLogModel,
  User as UserModel,
  Operation as OperationModel,
} from '@prisma/client';

export type OperationLogModelWithRelations = OperationLogModel & {
  operation: OperationModel;
  operator: UserModel;
};
