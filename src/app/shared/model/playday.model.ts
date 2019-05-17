import { IPlayer } from './player.model';

export interface IPlayDay {
   id: string;
   day: string;
   playerIds: string[];
   saisonId: string;
   isCancelled: boolean;
   extraPayIds: number[];
   numOfHours: number;
   numOfCourts: number;
   remark?: string;
}

export class PlayDay implements IPlayDay {
  id: string;
  day: string;
  playerIds: string[];
  saisonId: string;
  isCancelled: boolean;
  extraPayIds: number[];
  numOfHours: number;
  numOfCourts: number;
  remark?: string;

  constructor(aId?: string, aPlayDay?: IPlayDay) {
    if (aId == undefined && aPlayDay != undefined ||
        aId != undefined && aPlayDay == undefined) {
      throw new Error("PlayDay constructor: Params aId and aPlayDay need to be both undefined or both filled!");
    }
    this.clear();
    if (aId != undefined) {
      Object.assign(this, aPlayDay);
      this.id = <string>aId;
    }
  }

  clear(): void {
    this.id = "";
    this.day = "";
    this.playerIds = [];
    this.saisonId = "";
    this.isCancelled = false;
    this.extraPayIds = [];
    this.numOfHours = 1;
    this.numOfCourts = 1;
    this.remark = "";
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
    this.day = aDate.toISOString();
  }
}
