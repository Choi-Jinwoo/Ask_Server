import { CustomError } from './custom.error';
import { ErrorCode } from './error-code.enum';

export class AuthFailedError extends CustomError {
  constructor(readonly errorCode: ErrorCode) {
    super(errorCode);
  }
}