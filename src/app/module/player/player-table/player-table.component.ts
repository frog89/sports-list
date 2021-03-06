import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { Player, IPlayer } from 'src/app/shared/model/player.model';
import { slideIn } from '../../../shared/animations';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { DocumentChangeAction } from 'angularfire2/firestore';
import { NotificationService } from '../../../shared/service/notification.service';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { PlayerDataService } from 'src/app/shared/service/player-data.service';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss'],
  animations: [ slideIn ]
})
export class PlayerTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) myPaginator: MatPaginator;
  @ViewChild(MatSort) mySort: MatSort;
  myDataSource: MatTableDataSource<Player>;
  mySearchText: string;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['firstName', 'lastName', 'shortAlias', 'isActive', 'actions'];

  constructor(private playerDataService: PlayerDataService, 
    private notificationService: NotificationService, 
    private dialog: MatDialog,
    private dialogService: DialogService) {
  }

  getPopupDialogConfig(aData?: Player): MatDialogConfig {
    let dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = "edit-dialog-container";
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
    this.mySearchText = "";
    this.applyFilter();
  }

  applyFilter() {
    this.myDataSource.filter = this.mySearchText.trim().toLowerCase();
  }

  onEdit(aPlayer: Player) {
    //console.log('DEBUG: ' + JSON.stringify(aPlayer));
    this.dialog.open(EditPlayerComponent, this.getPopupDialogConfig(aPlayer));
  }

  onDelete(aId: string){
    this.dialogService.openConfirmDialog("Are you sure to delete this record ?")
      .afterClosed().subscribe(res => {
        if (res) {
          this.playerDataService.delete(aId);
          this.notificationService.warn('Deleted successfully !');  
        }
      });
  }

  ngAfterViewInit() {
    let players: Player[] = [];

    this.playerDataService.getList(true).subscribe(dbPlayers => {
      players.length = 0;
      for (let i: number = 0; i < dbPlayers.length; i++) {
        let dbPlayer: DocumentChangeAction<IPlayer> = dbPlayers[i];
        players.push(new Player(dbPlayer.payload.doc.id, dbPlayer.payload.doc.data()));
      }

      this.myDataSource = new MatTableDataSource(players);
      this.myDataSource.sort = this.mySort;
      this.myDataSource.paginator = this.myPaginator;
      this.myDataSource.filterPredicate = (p: any, filter: string) => {
        return this.displayedColumns.some((col: string) => {
          let prop: string = String(p[col]);
          return col != 'actions' && prop.toLowerCase().indexOf(filter) != -1;
        });
      }
    });
  }
}
