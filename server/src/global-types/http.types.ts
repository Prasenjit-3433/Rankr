import { Request } from 'express';
import { AuthPayload } from './auth-payload.type';

export type RequestWithAuth = Request & AuthPayload;
