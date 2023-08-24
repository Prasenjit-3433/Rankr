import {
  BadRequestException,
  Logger,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { PollsService } from './polls.service';
import { Namespace } from 'socket.io';
import { SocketWithAuth } from '../global-types/socket.types';
import { WsCatchAllFilter } from '../exceptions/ws-catch-all-filter';

@UsePipes(new ValidationPipe())
@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({
  namespace: 'polls',
})
export class PollsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(PollsGateway.name);

  constructor(private readonly pollsService: PollsService) {}

  @WebSocketServer() io: Namespace;

  // Gateway initialized (provided in module and instantiated)
  afterInit(): void {
    this.logger.log(`Websocket Gateway Initialized.`);
  }

  async handleConnection(client: SocketWithAuth) {
    const sockets = this.io.sockets;

    this.logger.debug(
      `Socket connected with userID: ${client.userID}, pollID: ${client.pollID} and name: "${client.name}"`,
    );

    this.logger.log(`WS Client with id: ${client.id} connected.`);
    this.logger.debug(`Number of all connected sockets: ${sockets.size}`);

    const roomName = client.pollID;
    await client.join(roomName);

    const clientCount = this.io.adapter.rooms.get(roomName)?.size ?? 0;

    this.logger.debug(
      `userID: ${client.userID} joined room with name: ${roomName}`,
    );

    this.logger.debug(
      `Total clients connected to room '${roomName}': ${clientCount}`,
    );

    const updatedPoll = await this.pollsService.addParticipant({
      pollID: client.pollID,
      userID: client.userID,
      name: client.name,
    });

    this.io.to(roomName).emit('poll_updated', updatedPoll);
  }

  async handleDisconnect(client: SocketWithAuth) {
    const sockets = this.io.sockets;
    const { pollID, userID } = client;
    const updatedPoll = await this.pollsService.removeParticipant({
      pollID,
      userID,
    });

    const roomName = client.pollID;
    const clientCount = this.io.adapter.rooms.get(roomName)?.size ?? 0;
    this.logger.log(`Disconnected socket id: ${client.id}`);
    this.logger.debug(`Number of all connected sockets: ${sockets.size}`);
    this.logger.debug(`
    Total clients connected to room '${roomName}': ${clientCount}
    `);

    // updatedPoll could be undefined if the poll already started
    if (updatedPoll) {
      this.io.to(roomName).emit('poll_updated', updatedPoll);
    }
  }

  @SubscribeMessage('test')
  async test() {
    throw new BadRequestException("it's a err message");
  }
}
