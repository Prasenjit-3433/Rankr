import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { SocketWithAuth } from 'src/global-types/socket.types';
import {
  WsBadRequestException,
  WsUnauthorizedException,
  WsUnknownException,
} from './ws-exceptions';

@Catch()
export class WsCatchAllFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const socket: SocketWithAuth = host.switchToWs().getClient();

    if (exception instanceof BadRequestException) {
      const exceptionData = exception.getResponse();
      const exceptionMessage =
        exceptionData['message'] ?? exceptionData ?? exception.name;

      const wsException = new WsBadRequestException(exceptionMessage);
      socket.emit('exception', wsException.getError());
      return;
    }

    if (exception instanceof WsUnauthorizedException) {
      socket.emit('exception', exception.getError());
      return;
    }

    const wsExecption = new WsUnknownException(exception.message);
    socket.emit('exception', wsExecption.getError());
  }
}
