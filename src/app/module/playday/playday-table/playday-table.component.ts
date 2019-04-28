import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { PlaydayTableDataSource } from './playday-table-datasource';
import { slideIn } from '../../shared/animations';
import { DataService } from '../../shared/data.service';
import { IPlayDay, PlayDay } from 'src/app/model/playday.model';
import { IPlayer, Player } from 'src/app/model/player.model';

@Component({
  selector: 'app-playday-table',
  templateUrl: './playday-table.component.html',
  styleUrls: ['./playday-table.component.css'],
  animations: [ slideIn ]
})
export class PlaydayTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: PlaydayTableDataSource | null;
  players : Player[] = [];

  constructor(private dataService: DataService) {
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'day'];

  ngOnInit(): void {
    this.dataSource = null;

    this.dataService.getPlayers().subscribe(firePlayers => {
      this.players.length = 0;
      for (let i: number = 0; i < firePlayers.length; i++) {
        let player: IPlayer = firePlayers[i];
        let col: string = `p${i}`;
        this.displayedColumns.push(col);
        this.players.push(new Player(player));
      }

      //console.log('DEBUG: ' + JSON.stringify(this.displayedColumns));
      //console.log('DEBUG: ' + JSON.stringify(this.players));

      this.loadPlayDays();
    });
  }

  loadPlayDays() : void {
    this.dataService.getPlayDays().subscribe(playDays => {
      let playDayArray : IPlayDay[] = [];
      for(let playDay of playDays) {
        playDayArray.push(new PlayDay(this.players, playDay));
      }
      //console.log('DEBUG: ' + JSON.stringify(playDayArray));

      this.dataSource = new PlaydayTableDataSource(
        playDayArray, this.paginator, this.sort);
    });
  }

}
