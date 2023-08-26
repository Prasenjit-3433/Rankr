export type Participants = {
    [participantID: string]: string;
}

type NominationID = string;

export type Nomination = {
    userID: string;
    text: string;
};

export type Nominations = {
    [nominationID: NominationID]: Nomination;
};

export type Rankings = {
    [userID: string]: NominationID[];
};

export type Poll = {
    id: string;
    topic: string;
    votesPerVoter: number;
    participants: Participants;
    adminID: string;
    nominations: Nominations;
    rankings: Rankings;
    hasStarted: boolean;
}