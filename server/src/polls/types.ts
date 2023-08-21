import { Request } from 'express';

// Repository types
export type CreatePollData = {
  pollID: string;
  userID: string;
  topic: string;
  votesPerVoter: number;
};

export type AddParticipantData = {
  pollID: string;
  userID: string;
  name: string;
};

// guard types
type AuthPayload = {
  userID: string;
  pollID: string;
  name: string;
};

export type RequestWithAuth = Request & AuthPayload;
