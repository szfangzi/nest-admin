import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import {
  catchError,
  endWith,
  from,
  ignoreElements,
  mergeMap,
  Observable,
  throwError,
} from 'rxjs';
import { OperationLogService } from '@admin/operation-log/operation-log.service';
import { CreateOperationLogDto } from '@admin/operation-log/dto';
import { OperationService } from '@admin/operation/operation.service';
import { ConfigService } from '@nestjs/config';
import { BusinessType } from '@modules/business/business.enum';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const matchPath = require('node-match-path');

@Injectable()
export class OperationLogInterceptor implements NestInterceptor {
  constructor(
    private operationLogService: OperationLogService,
    private operationService: OperationService,
    private configService: ConfigService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      // value是service返回的值
      mergeMap((value) =>
        from(
          (async () => {
            const request = context.switchToHttp().getRequest();
            const controllerName = context.getClass().name;
            const businessType = controllerName.split('Controller')[0];

            // 不是业务流程就终止
            if (!Object.keys(BusinessType).includes(businessType)) return;

            const prefix = this.configService.get<string>('API_PREFIX');
            const path = request.path.split(prefix)[1];
            const operations = await this.operationService.findAll();
            const operation = operations.find(
              (operation) =>
                matchPath.match(operation.path, path).matches &&
                operation.method === request.method.toUpperCase(),
            );
            if (
              operation &&
              request.session.userInfo &&
              request.session.userInfo.user.id
            ) {
              const createOperationLogDto = new CreateOperationLogDto();
              createOperationLogDto.remark = 'asd';
              createOperationLogDto.businessId = +request.params.id;
              createOperationLogDto.businessType =
                controllerName.split('Controller')[0];
              createOperationLogDto.operation = {
                connect: {
                  id: operation.id,
                },
              };
              createOperationLogDto.operator = {
                connect: {
                  id: request.session.userInfo.user.id,
                },
              };
              await this.operationLogService.create(createOperationLogDto);
            }
          })(),
        ).pipe(
          ignoreElements(),
          catchError((err) => throwError(err)), // catching all errors.
          endWith(value),
        ),
      ),
      // catchError((err) => throwError(err)),
    );
  }
}
