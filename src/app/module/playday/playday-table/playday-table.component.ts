import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { PlaydayTableDataSource } from './playday-table-datasource';
import { slideIn } from '../../shared/animations';
import { DataService } from '../../shared/data.service';
import { IPlayDay, PlayDay } from 'src/app/model/playday.model';
import { IPlayer } from 'src/app/model/player.model';

@Component({
  selector: 'app-playday-table',
  templateUrl: './playday-table.component.html',
  styleUrls: ['./playday-table.component.css'],
  animations: [ slideIn ]
})
export class PlaydayTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: PlaydayTableDataSource;
  players : IPlayer[] = [];

  constructor(private dataService: DataService) {
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'day'];

  ngOnInit(): void {
    this.dataSource = null;

    this.dataService.getPlayers().subscribe(p => {
      this.players = p;
      for (let i: number = 0; i < this.players.length; i++) {
        let col: string = `p${i}`;
        this.displayedColumns.push(col);
      }

      console.log('DEBUG: ' + JSON.stringify(this.displayedColumns));

      this.loadPlayDays();
    });
  }

  loadPlayDays() : void {
    this.dataService.getPlayDays().subscribe(playDays => {
      let playDayArray : IPlayDay[] = [];
      for(let playDay of playDays) {
        let p: IPlayDay = playDay;
        playDayArray.push(new PlayDay(this.players, p));
      }
      console.log('DEBUG: ' + JSON.stringify(playDayArray));

      this.dataSource = new PlaydayTableDataSource(
        playDayArray, this.paginator, this.sort);
    });
  }

}
