import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { slideIn } from '../../../shared/animations';
import { PlaydayDataService } from '../../../shared/service/playday-data.service';
import { IPlayDay, PlayDay } from 'src/app/shared/model/playday.model';
import { IPlayer, Player } from 'src/app/shared/model/player.model';
import { DocumentChangeAction } from 'angularfire2/firestore';
import { PlayerDataService } from 'src/app/shared/service/player-data.service';
import { EditPlaydayComponent } from '../edit-playday/edit-playday.component';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { DialogService } from 'src/app/shared/service/dialog.service';

@Component({
  selector: 'app-playday-table',
  templateUrl: './playday-table.component.html',
  styleUrls: ['./playday-table.component.scss'],
  animations: [ slideIn ]
})
export class PlaydayTableComponent implements OnInit {
  @ViewChild(MatPaginator) myPaginator: MatPaginator;
  @ViewChild(MatSort) mySort: MatSort;
  myDataSource: MatTableDataSource<PlayDay>;
  mySearchText: string;
  myAllPlayers : Player[] = [];

  constructor(private playdayDataService: PlaydayDataService,
    private playerDataService: PlayerDataService,
    private notificationService: NotificationService, 
    private dialog: MatDialog,
    private dialogService: DialogService) {
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.playerDataService.getList(false).subscribe(dbPlayers => {
      this.myAllPlayers.length = 0;
      for (let i: number = 0; i < dbPlayers.length; i++) {
        let player: DocumentChangeAction<IPlayer> = dbPlayers[i];
        this.myAllPlayers.push(new Player(player.payload.doc.id, player.payload.doc.data()));
      }

      //console.log('DEBUG: ' + JSON.stringify(this.displayedColumns));
      //console.log('DEBUG: ' + JSON.stringify(this.players));

      this.loadPlayDays();
    });
  }

  getPopupDialogConfig(aData?: PlayDay): MatDialogConfig {
    let dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "95%";
    dialogConfig.maxWidth = "95%";
    if (aData == undefined) {
      aData = new PlayDay();
    }
    dialogConfig.data = aData;
    return dialogConfig;
  }

  onCreate() {
    this.dialog.open(EditPlaydayComponent, this.getPopupDialogConfig());
  }

  clearFilter(): void {
    this.mySearchText = "";
    this.applyFilter();
  }

  applyFilter() {
    this.myDataSource.filter = this.mySearchText.trim().toLowerCase();
  }

  onEdit(aPlayDay: PlayDay) {
    //console.log('DEBUG: ' + JSON.stringify(aPlayer));
    this.dialog.open(EditPlaydayComponent, this.getPopupDialogConfig(aPlayDay));
  }

  onDelete(aId: string){
    this.dialogService.openConfirmDialog("Are you sure to delete this record ?")
      .afterClosed().subscribe(res => {
        if (res) {
          this.playdayDataService.delete(aId);
          this.notificationService.warn('Deleted successfully !');  
        }
      });
  }

  loadPlayDays() {
    let playdays: PlayDay[] = [];

    this.playdayDataService.getList().subscribe(dbPlaydays => {
      this.displayedColumns.length = 0;
      this.displayedColumns.push("day");
      this.displayedColumns.push("isCancelled");
      for (let i: number = 0; i < this.myAllPlayers.length; i++) {
        let col: string = `p${i}`;
        this.displayedColumns.push(col);
      }
      this.displayedColumns.push("actions");

      playdays.length = 0;
      for (let i: number = 0; i < dbPlaydays.length; i++) {
        let dbPlayday: DocumentChangeAction<IPlayDay> = dbPlaydays[i];
        playdays.push(new PlayDay(dbPlayday.payload.doc.id, dbPlayday.payload.doc.data()));
      }

      this.myDataSource = new MatTableDataSource(playdays);
      this.myDataSource.sort = this.mySort;
      this.myDataSource.paginator = this.myPaginator;
      this.myDataSource.sortingDataAccessor = (item: PlayDay, property: string) => {
        for (let i: number = 0; i < this.myAllPlayers.length; i++) {
          if (property == `p${i}`) {
            return item.hasPlayerPlayed(this.myAllPlayers[i]);
          }
        }
        let anyItem: any = item;
        return anyItem[property];
      };
      this.myDataSource.filterPredicate = (p: any, filter: string) => {
        return this.displayedColumns.some((col: string) => {
          let prop: string = String(p[col]);
          return col != 'actions' && prop.toLowerCase().indexOf(filter) != -1;
        });
      }
    });
  }
}
