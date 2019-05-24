import { Injectable } from '@angular/core';
import { Settings, ISettings } from '../model/settings.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { DocumentChangeAction } from 'angularfire2/firestore';
import { SettingsDataService } from './settings-data.service';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { load } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings$: BehaviorSubject<Settings | null>;

  constructor(private settingsDataService: SettingsDataService) { 
    this.settings$ = new BehaviorSubject<Settings | null>(null);
  }

  load() {
    this.settingsDataService.getList().subscribe( dbSettings => {
      if (dbSettings.length != 1) {
        throw new Error(`Expected is 1 settings object, but found ${dbSettings.length}`);
      }
      let dbSetting: DocumentChangeAction<ISettings> = dbSettings[0];
      let settings: Settings = new Settings(dbSetting.payload.doc.id, dbSetting.payload.doc.data()); 
      this.settings$.next(settings);
    });
  }

  update(aSettings: Settings) {
    this.settingsDataService.update(aSettings);
    this.settings$.next(aSettings);
  }

  get stageEnvironment() : any {
    return environment;
  }
}
