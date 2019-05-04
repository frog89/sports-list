export interface IPlayer {
  id: number;
  firstName: String;
  lastName: String;
  shortAlias: string;
  isActive: boolean;
}

export class Player implements IPlayer {
  id: number;
  firstName: string;
  lastName: string;
  shortAlias: string;
  isActive: boolean;

  constructor(player: IPlayer) {
    Object.assign(this, player);
  }

  getFullName(): string {
    return `${this.lastName}, ${this.firstName}`;
  }
}
