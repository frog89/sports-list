import { Component, OnInit } from '@angular/core';
import { SettingsDataService } from '../shared/service/settings-data.service';
import { SaisonDataService } from '../shared/service/saison-data.service';
import { NotificationService } from '../shared/service/notification.service';
import { DocumentChangeAction } from 'angularfire2/firestore';
import { ISettings, Settings } from '../shared/model/settings.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  mySettings: Settings = new Settings();

  constructor(private settingsDataService: SettingsDataService, 
      private saisonDataService: SaisonDataService, 
      private notificationService: NotificationService) {
    //console.log('DEBUG: ' + JSON.stringify(this.player));
    this.loadSettings();
  }

  loadSettings() {
    this.settingsDataService.getList().subscribe( dbSettings => {
      if (dbSettings.length != 1) {
        throw new Error(`Expected is 1 settings object, but found ${dbSettings.length}`);
      }
      let dbSetting: DocumentChangeAction<ISettings> = dbSettings[0];
      this.mySettings = new Settings(dbSetting.payload.doc.id, dbSetting.payload.doc.data()); 
    });
  }

  ngOnInit() {
  }

}
