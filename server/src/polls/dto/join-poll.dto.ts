import { IsString, Length } from 'class-validator';

export class JoinPollDto {
  @IsString()
  @Length(6, 6)
  pollID: string;

  @IsString()
  @Length(1, 25)
  name: string;
}
