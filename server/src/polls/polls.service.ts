import { Injectable, Logger } from '@nestjs/common';
import { CreatePollDto } from './dto/create-poll.dto';
import { JoinPollDto } from './dto/join-poll.dto';
import { createPollID, createUserID } from 'src/utils/ids';
import { RejoinPollDto } from './dto/rejoin-poll.dto';
import { PollsRepository } from './polls.repository';

@Injectable()
export class PollsService {
  private readonly logger = new Logger(PollsService.name);

  constructor(private readonly pollsRepository: PollsRepository) {}

  async createPoll(createPollDto: CreatePollDto) {
    const { topic, votesPerVoter } = createPollDto;

    const pollID = createPollID();
    const userID = createUserID();

    const createdPoll = await this.pollsRepository.createPoll({
      pollID,
      userID,
      topic,
      votesPerVoter,
    });

    // TODO: Create an accessToken based off of pollID and userID

    return {
      poll: createdPoll,
      // accessToken
    };
  }

  async joinPoll(joinPollDto: JoinPollDto) {
    const userID = createUserID();

    this.logger.debug(
      `Fetching poll with ID: ${joinPollDto.pollID} for user with ID: ${userID}`,
    );

    const joinedPoll = await this.pollsRepository.getPoll(joinPollDto.pollID);

    // TODO: Create access Token

    return {
      poll: joinedPoll,
      // accessToken: signedString,
    };
  }

  async rejoinPoll(rejoinPollDto: RejoinPollDto) {
    this.logger.debug(
      `Rejoining poll with ID: ${rejoinPollDto.pollID} for user with ID: ${rejoinPollDto.userID} 
      with name: ${rejoinPollDto.name}`,
    );

    const joinedPoll = await this.pollsRepository.addParticipant(rejoinPollDto);

    return joinedPoll;
  }
}
