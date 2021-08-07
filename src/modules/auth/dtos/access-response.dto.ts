import { RouteDto } from '@admin/menu/dtos/route.dto';
import { PageElementResponseDto } from '@admin/pageElement/dtos/page-element-response.dto';
import { OperationResponseDto } from '@admin/operation/dtos/operation.response.dto';

export class AccessResponseDto {
  routes: RouteDto[];
  operations: OperationResponseDto[];
  pageElements: PageElementResponseDto[];
}
