export interface IPlayer {
  id: string;
  email: string | null;
  firstName: String;
  lastName: String;
  shortAlias: string;
  isActive: boolean;
}

export class Player implements IPlayer {
  id: string;
  email: string | null;
  firstName: string;
  lastName: string;
  shortAlias: string;
  isActive: boolean;

  constructor(aId?: string, player?: IPlayer) {
    if (aId == undefined && player != undefined ||
        aId != undefined && player == undefined) {
      throw new Error("Instantiate a Player with no params or both params!");
    }
    if (aId != undefined) {
      Object.assign(this, player);
      this.id = <string>aId;
    } else {
      this.clear();
    }
  }

  clear(): void {
    this.id = "";
    this.firstName = "";
    this.lastName = "";
    this.shortAlias = "";
    this.isActive = true;
  }

  getFullName(): string {
    return `${this.lastName}, ${this.firstName}`;
  }
}
