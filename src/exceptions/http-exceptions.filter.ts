import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ErrorType } from './index';

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    Logger.debug(exception.stack, 'HttpExceptionsFilter');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
      errorType = 'INTERNAL_SERVER_ERROR',
      message = '系统内部错误！';
    if (exception instanceof HttpException) {
      const res = exception.getResponse() as {
        error: ErrorType;
        message: any;
      };
      statusCode = exception.getStatus();
      errorType = res.error;
      message = res.message;
    }
    response.status(statusCode).json({
      statusCode,
      errorType,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
