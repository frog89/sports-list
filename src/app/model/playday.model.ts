import { firestore } from 'firebase';
import { IPlayer } from './player.model';

export interface IPlayDay {
   id: number;
   day: firestore.Timestamp;
   playerIds: number[];
   isCancelled: boolean;
   extraPayIds: number[];
   numOfHours: number;
   numOfCourts: number;
   remark?: string;
}

export class PlayDay implements IPlayDay {
  id: number;
  day: firestore.Timestamp;
  playerIds: number[];
  isCancelled: boolean;
  extraPayIds: number[];
  numOfHours: number;
  numOfCourts: number;
  remark?: string;

  constructor(private sortedPlayers : IPlayer[], private playDay: IPlayDay) {
    Object.assign(this, playDay);
  }

  hasPlayerPlayed(index: number) : boolean {
    if (index < 0 || index > this.sortedPlayers.length - 1) {
      return false;
    }
    for (let i: number = 0; i < this.playerIds.length; i++) {
      if (index == this.playerIds[i]) {
        return true;
      }
    }
    return false;
  }

  get dayAsDate() : Date {
    return this.playDay.day.toDate();
  }
  set dayAsDate(aDate : Date) {
    this.playDay.day = firestore.Timestamp.fromDate(aDate);
  }
}
