import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { DataService } from '../../../shared/data.service';
import { Player, IPlayer } from 'src/app/shared/model/player.model';
import { slideIn } from '../../../shared/animations';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { DocumentChangeAction } from 'angularfire2/firestore';
import { NotificationService } from '../../../shared/notification.service';
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss'],
  animations: [ slideIn ]
})
export class PlayerTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Player>;
  searchText: string;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'firstName', 'lastName', 'shortAlias', 'isActive', 'actions'];

  constructor(private dataService: DataService, 
    private notificationService: NotificationService, 
    private dialog: MatDialog,
    private dialogService: DialogService) {
  }

  getPopupDialogConfig(aData?: Player): MatDialogConfig {
    let dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "95%";
    dialogConfig.maxWidth = "95%";
    if (aData == undefined) {
      aData = new Player();
    }
    dialogConfig.data = aData;
    return dialogConfig;
  }

  onCreate() {
    this.dialog.open(EditPlayerComponent, this.getPopupDialogConfig());
  }

  clearFilter(): void {
    this.searchText = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  onEdit(aPlayer: Player) {
    //console.log('DEBUG: ' + JSON.stringify(aPlayer));
    this.dialog.open(EditPlayerComponent, this.getPopupDialogConfig(aPlayer));
  }

  onDelete(aId: string){
    this.dialogService.openConfirmDialog("Are you sure to delete this record ?")
      .afterClosed().subscribe(res => {
        if (res) {
          this.dataService.deletePlayer(aId);
          this.notificationService.warn('Deleted successfully !');  
        }
      });
  }

  ngAfterViewInit() {
    let players: Player[] = [];

    this.dataService.getPlayers(true).subscribe(dbPlayers => {
      players.length = 0;
      for (let i: number = 0; i < dbPlayers.length; i++) {
        let dbPlayer: DocumentChangeAction<IPlayer> = dbPlayers[i];
        players.push(new Player(dbPlayer.payload.doc.id, dbPlayer.payload.doc.data()));
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
