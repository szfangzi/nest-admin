export class CreateOperationLogDto {
  remark: string;
  businessType: string;
  businessId: number;
  operation: {
    connect: {
      id: number;
    };
  };
  operator: {
    connect: {
      id: number;
    };
  };
}
