import StatusCode from '@/infra/http/enums/status-code';
import { HandleError } from '@/shared/errors/handle-error';
import { NextFunction, Request, Response } from 'express';

function globalErrors(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction,
) {
  if (error instanceof HandleError) {
    response.status(StatusCode.BAD_REQUEST).json({
      status: 'error',
      message: error.message,
    });

    return;
  }

  console.error(error);

  response.status(StatusCode.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: error?.message ?? 'Internal server error',
  });
}

export default globalErrors;
