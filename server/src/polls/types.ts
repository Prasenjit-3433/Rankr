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
