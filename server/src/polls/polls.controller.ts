import { Controller, Post, Body } from '@nestjs/common';
import { CreatePollDto } from './dto/create-poll.dto';
import { JoinPollDto } from './dto/join-poll.dto';
import { PollsService } from './polls.service';
import { RejoinPollDto } from './dto/rejoin-poll.dto';

@Controller('polls')
export class PollsController {
  constructor(private pollsService: PollsService) {}

  @Post()
  async create(@Body() createPollDto: CreatePollDto) {
    const result = await this.pollsService.createPoll(createPollDto);

    return result;
  }

  @Post('/join')
  async join(@Body() joinPollDto: JoinPollDto) {
    const result = await this.pollsService.joinPoll(joinPollDto);

    return result;
  }

  @Post('/rejoin')
  async rejoin() {
    const rejoinPollDto: RejoinPollDto = {
      name: 'From token',
      pollID: 'Also from token',
      userID: 'Also from token',
    };

    const result = await this.pollsService.rejoinPoll(rejoinPollDto);

    return result;
  }
}
