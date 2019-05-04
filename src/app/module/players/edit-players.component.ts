import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { EditPlayersDataSource } from './edit-players-datasource';
import { DataService } from '../shared/data.service';
import { Player, IPlayer } from 'src/app/model/player.model';
import { slideIn } from '../shared/animations';

@Component({
  selector: 'app-edit-players',
  templateUrl: './edit-players.component.html',
  styleUrls: ['./edit-players.component.scss'],
  animations: [ slideIn ]
})
export class EditPlayersComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: EditPlayersDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'firstName', 'lastName', 'shortAlias', 'isActive', 'actions'];

  constructor(private dataService: DataService) {
  }

  playerCount(): number {
    return this.dataSource == null ? 0 : this.dataSource.players.length;
  }

  ngAfterViewInit() {
    let players: Player[] = [];

    this.dataService.getPlayers(true).subscribe(dbPlayers => {
      players.length = 0;
      for (let i: number = 0; i < dbPlayers.length; i++) {
        let dbPlayer: IPlayer = dbPlayers[i];
        players.push(new Player(dbPlayer));
      }

      this.dataSource = new EditPlayersDataSource(this.paginator, this.sort, players);
    });
  }
}
