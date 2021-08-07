import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TimeLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    Logger.verbose(
      `执行时间计算开始...`,
      `${context.getClass().name}/${context.getHandler().name}`,
    );

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.verbose(
            `执行时间计算结束...`,
            `${context.getClass().name}/${context.getHandler().name}`,
          ),
        ),
      );
  }
}
