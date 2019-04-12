import { Player } from './player.model';
import { ExtraPay } from './extrapay.model';

export interface PlayDay {
   id: number;
   day: Date;
   playerIds: number[];
   isCancelled: boolean;
   extraPayIds: number[];
   numOfHours: number;
   numOfCourts: number;
   remark?: string;
}