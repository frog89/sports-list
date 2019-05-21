import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { IPlayDay, PlayDay } from '../model/playday.model';
import { ISettings, Settings } from '../model/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsDataService {
  private readonly MyCollectionName: string = "Settings";

  constructor(private afs: AngularFirestore) { }

  getList() : Observable<DocumentChangeAction<ISettings>[]> {
    return this.afs.collection<Settings>(this.MyCollectionName).snapshotChanges();
  }

  update(settings: ISettings): void {
    let doc: AngularFirestoreDocument<ISettings> = this.afs.
      doc<ISettings>(`${this.MyCollectionName}/${settings.id}`);
    let obj: ISettings = Object.assign({}, settings);
    doc.update(obj);
  }
}
