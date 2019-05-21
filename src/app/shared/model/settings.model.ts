export interface ISettings {
  id: string;
  sportName: string;
  saisonId: string;
}

export class Settings implements ISettings {
  id: string;
  sportName: string;
  saisonId: string;

 constructor(aId?: string, saison?: ISettings) {
   if (aId == undefined && saison != undefined ||
       aId != undefined && saison == undefined) {
     throw new Error("Instantiate Settings class with no params or both params!");
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
   this.sportName = "";
   this.saisonId = "";
 }
}
