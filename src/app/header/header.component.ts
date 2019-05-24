import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';
import { Player } from '../shared/model/player.model';
import { SettingsService } from '../shared/service/settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  myHeader: string;

  constructor(private settingsService: SettingsService,
      public authService: AuthService) {
    this.settingsService.settings$.subscribe(s => {
      if (s == null) {
        this.myHeader = "Sports List";
      } else {
        let player: Player | null = this.authService.loginPlayer$.getValue();
        let loginName: string = "?";
        if (player != null) {
          loginName = player.getFullName();
        }
        this.myHeader = `${s.sportName} (${loginName})`;  
      }
    });
    //console.log('DEBUG: ' + JSON.stringify(this.player));
  }

  ngOnInit() {
  }
}
