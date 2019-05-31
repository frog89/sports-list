export interface IExtraPay {
  id: string;
  playerId: string;
  playDayId: string;
  amount: number;
}

export class ExtraPay implements IExtraPay {
  id: string;
  playerId: string;
  playDayId: string;
  amount: number;

  constructor(aId?: string, aData?: IExtraPay) {
    if (aId == undefined && aData != undefined ||
        aId != undefined && aData == undefined) {
      throw new Error("Instantiate a ExtraPayKind with no params or both params!");
    }
    if (aId != undefined) {
      Object.assign(this, aData);
      this.id = <string>aId;
    } else {
      this.clear();
    }
  }

  clear(): void {
    this.id = "";
    this.playerId = "";
    this.playDayId = "";
    this.amount = 0;
  }
}
