import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { slideIn } from '../../../shared/animations';
import { EditSaisonComponent } from '../edit-saison/edit-saison.component';
import { DocumentChangeAction } from 'angularfire2/firestore';
import { NotificationService } from '../../../shared/service/notification.service';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { Saison, ISaison } from 'src/app/shared/model/saison.model';
import { SaisonDataService } from 'src/app/shared/service/saison-data.service';

@Component({
  selector: 'app-saison-table',
  templateUrl: './saison-table.component.html',
  styleUrls: ['./saison-table.component.scss'],
  animations: [ slideIn ]
})
export class SaisonTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Saison>;
  searchText: string;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'dayFrom', 'dayTo', 'actions'];

  constructor(private saisonDataService: SaisonDataService, 
    private notificationService: NotificationService, 
    private dialog: MatDialog,
    private dialogService: DialogService) {
  }

  getPopupDialogConfig(aData?: Saison): MatDialogConfig {
    let dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "95%";
    dialogConfig.maxWidth = "95%";
    if (aData == undefined) {
      aData = new Saison();
    }
    dialogConfig.data = aData;
    return dialogConfig;
  }

  onCreate() {
    this.dialog.open(EditSaisonComponent, this.getPopupDialogConfig());
  }

  clearFilter(): void {
    this.searchText = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  onEdit(aSaison: Saison) {
    //console.log('DEBUG: ' + JSON.stringify(aSaison));
    this.dialog.open(EditSaisonComponent, this.getPopupDialogConfig(aSaison));
  }

  onDelete(aId: string){
    this.dialogService.openConfirmDialog("Are you sure to delete this record ?")
      .afterClosed().subscribe(res => {
        if (res) {
          this.saisonDataService.delete(aId);
          this.notificationService.warn('Deleted successfully !');  
        }
      });
  }

  ngAfterViewInit() {
    let saisons: Saison[] = [];

    this.saisonDataService.getList().subscribe(dbSaisons => {
      saisons.length = 0;
      for (let i: number = 0; i < dbSaisons.length; i++) {
        let dbSaison: DocumentChangeAction<ISaison> = dbSaisons[i];
        saisons.push(new Saison(dbSaison.payload.doc.id, dbSaison.payload.doc.data()));
      }

      this.dataSource = new MatTableDataSource(saisons);
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
