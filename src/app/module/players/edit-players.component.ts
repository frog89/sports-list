import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
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
  dataSource: MatTableDataSource<Player>;
  searchText: string;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'firstName', 'lastName', 'shortAlias', 'isActive', 'actions'];

  constructor(private dataService: DataService) {
  }

  onSearchClear(): void {
    this.searchText = "";
    this.search();
  }

  hasSubString(aProperty: string, aSearch: string): boolean {
    return aProperty.toLowerCase().indexOf(aSearch) >= 0;
  }

  search() {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  ngAfterViewInit() {
    let players: Player[] = [];

    this.dataService.getPlayers(true).subscribe(dbPlayers => {
      players.length = 0;
      for (let i: number = 0; i < dbPlayers.length; i++) {
        let dbPlayer: IPlayer = dbPlayers[i];
        players.push(new Player(dbPlayer));
      }

      this.dataSource = new MatTableDataSource(players);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (p: any, filter: string) => {
        return this.displayedColumns.some((col: string) => {
          let prop: string = String(p[col]);
          return col != 'actions' && prop.toLowerCase().indexOf(filter) != -1;
        });
      }
    });
  }
}
