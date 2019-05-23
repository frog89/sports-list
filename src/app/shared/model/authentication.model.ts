export interface IAuthentication {
  id: string;
  playerId: string;
}

export class Authentication implements IAuthentication {
  id: string;
  playerId: string;

  constructor(aId?: string, auth?: IAuthentication) {
    if (aId == undefined && auth != undefined ||
        aId != undefined && auth == undefined) {
      throw new Error("Instantiate Authentication with no params or both params!");
    }
    if (aId != undefined) {
      Object.assign(this, auth);
      this.id = <string>aId;
    } else {
      this.clear();
    }
  }

  clear(): void {
    this.id = "";
    this.playerId = "";
  }
}
