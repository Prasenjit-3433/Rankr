import { IsString, Length } from 'class-validator';

export class NominationDto {
  @IsString()
  @Length(1, 100)
  text: string;
}
