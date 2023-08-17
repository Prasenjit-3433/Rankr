import { IsString, Length } from 'class-validator';

export class RejoinPollDto {
  @IsString()
  @Length(6, 6)
  pollID: string;

  @IsString()
  userID: string;

  @IsString()
  @Length(1, 25)
  name: string;
}
