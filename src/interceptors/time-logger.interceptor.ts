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
    const start = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.verbose(
            `Call ${context.getClass().name}.${
              context.getHandler().name
            } took ${Date.now() - start}ms`,
            `TimeLoggerInterceptor`,
          ),
        ),
      );
  }
}
