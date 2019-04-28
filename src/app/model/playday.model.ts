import { IPlayer } from './player.model';

export interface IPlayDay {
   id: number;
   day: string;
   playerIds: number[];
   isCancelled: boolean;
   extraPayIds: number[];
   numOfHours: number;
   numOfCourts: number;
   remark?: string;
}

export class PlayDay implements IPlayDay {
  id: number;
  day: string;
  playerIds: number[];
  isCancelled: boolean;
  extraPayIds: number[];
  numOfHours: number;
  numOfCourts: number;
  remark?: string;

  constructor(private sortedPlayers : IPlayer[], playDay: IPlayDay) {
    Object.assign(this, playDay);
  }

  hasPlayerPlayed(player: IPlayer) : boolean {
    for (let i: number = 0; i < this.playerIds.length; i++) {
      if (player.id == this.playerIds[i]) {
        return true;
      }
    }
    return false;
  }

  get dayAsDate(): Date {
    return new Date(this.day);
  }
  set dayAsDate(aDate : Date) {
    this.day = Date.prototype.toJSON(aDate);
  }
}
