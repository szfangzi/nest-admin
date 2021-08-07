export enum RESPONSE_CODE {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

export enum RESPONSE_MESSAGE {
  SUCCESS = '成功',
  FAIL = '失败',
}

export class ActionResponseDto<T> {
  code: RESPONSE_CODE;
  data: T;
}

export class ResponseDto<T> {
  code: RESPONSE_CODE;
  msg: RESPONSE_MESSAGE;
  data: T;
  constructor(code: RESPONSE_CODE, data: T) {
    this.code = code;
    this.msg = RESPONSE_MESSAGE[code];
    this.data = data;
  }
}
