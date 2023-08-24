export type CreatePollFields = {
  topic: string;
  votesPerVoter: number;
  name: string;
};

export type JoinPollFields = {
  pollID: string;
  name: string;
};

export type RejoinPollFields = {
  pollID: string;
  userID: string;
  name: string;
};

export interface AddParticipantFields {
  pollID: string;
  userID: string;
  name: string;
}

export interface RemoveParticipantFields {
  pollID: string;
  userID: string;
}
