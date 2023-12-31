import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePollDto } from './dto/create-poll.dto';
import { JoinPollDto } from './dto/join-poll.dto';
import { PollsService } from './polls.service';
import { PollsGuard } from './guards/polls-controller.guard';
import { RequestWithAuth } from '../global-types/http.types';

@UsePipes(new ValidationPipe())
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

  @UseGuards(PollsGuard)
  @Post('/rejoin')
  async rejoin(@Req() request: RequestWithAuth) {
    const { pollID, userID, name } = request;

    const result = await this.pollsService.rejoinPoll({ pollID, userID, name });

    return result;
  }
}
