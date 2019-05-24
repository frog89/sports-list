import { Component, OnInit } from '@angular/core';
import { SettingsDataService } from '../shared/service/settings-data.service';
import { SaisonDataService } from '../shared/service/saison-data.service';
import { NotificationService } from '../shared/service/notification.service';
import { DocumentChangeAction } from 'angularfire2/firestore';
import { ISettings, Settings } from '../shared/model/settings.model';
import { AuthService } from '../shared/service/auth.service';
import { take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Player } from '../shared/model/player.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  mySettings$: Subject<Settings | null>;
  myLoginPlayer: Player | null;
  myHeader: string;

  constructor(private settingsDataService: SettingsDataService,
      public authService: AuthService) {
    this.mySettings$ = new Subject<Settings | null>();
    this.mySettings$.subscribe(s => {
      if (s == null) {
        this.myHeader = "Sports List";
      } else {
        let loginName: string = "?";
        if (this.myLoginPlayer != null) {
          loginName = this.myLoginPlayer.getFullName();
        }
        this.myHeader = `${s.sportName} (${loginName})`;  
      }
    });
    //console.log('DEBUG: ' + JSON.stringify(this.player));
    this.authService.loginPlayer$.subscribe(p => {
      this.myLoginPlayer = p;
      if (this.myLoginPlayer == null) {
        this.mySettings$.next(null);
      } else {
        this.loadSettings(); // Only load settings if somebody has logged in
      }
    });
  }

  loadSettings() {
    this.settingsDataService.getList().subscribe( dbSettings => {
      if (dbSettings.length != 1) {
        throw new Error(`Expected is 1 settings object, but found ${dbSettings.length}`);
      }
      let dbSetting: DocumentChangeAction<ISettings> = dbSettings[0];
      let settings: Settings = new Settings(dbSetting.payload.doc.id, dbSetting.payload.doc.data());
      this.mySettings$.next(settings); 
    });
  }

  ngOnInit() {
  }
}
