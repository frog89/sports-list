export interface IExtraPayKind {
  id: string;
  purpose: String;
  amount: number;
}

export class ExtraPayKind implements IExtraPayKind {
  id: string;
  purpose: String;
  amount: number;

  constructor(aId?: string, aData?: IExtraPayKind) {
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
    this.purpose = "";
    this.amount = 0;
  }
}
