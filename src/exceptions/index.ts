import { HttpExceptionsFilter } from './http-exceptions.filter';
import { DataExistsException } from './data-exists.exception';
import { DataNotFoundCanNotDeleteException } from './data-not-found-can-not-delete.exception';
import { DisabledUserException } from './disabled-user.exception';
import { InvalidAccountException } from './invalid-account.exception';
import { LoginExpiredException } from './login-expired.exception';

export enum ErrorType {
  NeedLogin = 'NEED_LOGIN',
  LoginExpired = 'LOGIN_EXPIRED',
  DataExists = 'DATA_EXISTS',
  DataNotFoundCannotBeDeleted = 'DATA_NOT_FOUND_CAN_NOT_DELETE',
  InvalidPassword = 'INVALID_PASSWORD',
  InvalidAccount = 'INVALID_ACCOUNT',
  DisabledUser = 'DISABLED_USER',
}

export const HttpErrorType = {
  400: 'BAD_REQUEST',
  401: 'UNAUTHORIZED',
  402: 'PAYMENT_REQUIRED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  405: 'METHOD_NOT_ALLOWED',
  406: 'NOT_ACCEPTABLE',
  407: 'PROXY_AUTHENTICATION_REQUIRED',
  408: 'REQUEST_TIMEOUT',
  409: 'CONFLICT',
  410: 'GONE',
  411: 'LENGTH_REQUIRED',
  412: 'PRECONDITION_FAILED',
  413: 'PAYLOAD_TOO_LARGE',
  414: 'URI_TOO_LONG',
  415: 'UNSUPPORTED_MEDIA_TYPE',
  416: 'REQUESTED_RANGE_NOT_SATISFIABLE',
  417: 'EXPECTATION_FAILED',
  418: 'I_AM_A_TEAPOT',
  421: 'MISDIRECTED',
  422: 'UNPROCESSABLE_ENTITY',
  424: 'FAILED_DEPENDENCY',
  429: 'TOO_MANY_REQUESTS',
  500: 'INTERNAL_SERVER_ERROR',
  501: 'NOT_IMPLEMENTED',
  502: 'BAD_GATEWAY',
  503: 'SERVICE_UNAVAILABLE',
  504: 'GATEWAY_TIMEOUT',
  505: 'HTTP_VERSION_NOT_SUPPORTED',
};

export {
  HttpExceptionsFilter,
  DataExistsException,
  DisabledUserException,
  DataNotFoundCanNotDeleteException,
  InvalidAccountException,
  LoginExpiredException,
};
