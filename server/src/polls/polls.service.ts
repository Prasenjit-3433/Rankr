import { Injectable } from '@nestjs/common';
import { CreatePollDto } from './dto/create-poll.dto';
import { JoinPollDto } from './dto/join-poll.dto';
import { createPollID, createUserID } from 'src/utils/ids';
import { RejoinPollDto } from './dto/rejoin-poll.dto';

@Injectable()
export class PollsService {
  async createPoll(createPollDto: CreatePollDto) {
    const pollID = createPollID();
    const userID = createUserID();

    return {
      ...createPollDto,
      userID,
      pollID,
    };
  }

  async joinPoll(joinPollDto: JoinPollDto) {
    const userID = createUserID();

    return {
      ...joinPollDto,
      userID,
    };
  }

  async rejoinPoll(rejoinPollDto: RejoinPollDto) {
    return rejoinPollDto;
  }
}
