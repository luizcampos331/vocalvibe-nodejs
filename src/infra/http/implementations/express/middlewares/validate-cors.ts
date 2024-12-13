import { env } from '@/main';
import { NextFunction, Request, Response } from 'express';

function validateCORS(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const ALLOWED_REQUEST_ORIGINS = [env.APP_WEB_URL];

  const ALLOWED_HEADERS = {
    origin: 'Access-Control-Allow-Origin',
    methods: 'Access-Control-Allow-Methods',
    headers: 'Access-Control-Allow-Headers',
  };

  const originReq = request.headers?.origin;

  if (originReq) {
    if (
      ALLOWED_REQUEST_ORIGINS.includes(originReq) ||
      originReq.includes(`.${env.DOMAIN}`)
    ) {
      response.header(ALLOWED_HEADERS.origin, originReq);
    }
  }

  response.header(ALLOWED_HEADERS.methods, '*');
  response.header(ALLOWED_HEADERS.headers, '*');

  next();
}

export default validateCORS;
