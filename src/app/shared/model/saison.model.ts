
export interface ISaison {
   id: string;
   name: string;
   dayFrom: string;
   dayTo: string;
}

export class Saison implements ISaison {
  id: string;
  name: string;
  dayFrom: string;
  dayTo: string;

  constructor(aId?: string, saison?: ISaison) {
    if (aId == undefined && saison != undefined ||
        aId != undefined && saison == undefined) {
      throw new Error("Instantiate a Saison with no params or both params!");
    }
    if (aId != undefined) {
      Object.assign(this, saison);
      this.id = <string>aId;
    } else {
      this.clear();
    }
  }

  clear(): void {
    this.id = "";
    this.name = "";
    this.dayFrom = "";
    this.dayTo = "";
  }

  get dayFromAsDate(): Date {
    return new Date(this.dayFrom);
  }
  set dayFromAsDate(aDate : Date) {
    this.dayFrom = Date.prototype.toJSON(aDate);
  }

  get dayToAsDate(): Date {
    return new Date(this.dayTo);
  }
  set dayToAsDate(aDate : Date) {
    this.dayTo = Date.prototype.toJSON(aDate);
  }
}
