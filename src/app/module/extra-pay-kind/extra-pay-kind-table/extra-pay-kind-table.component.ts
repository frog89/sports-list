import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { DocumentChangeAction } from 'angularfire2/firestore';
import { ExtraPayKind, IExtraPayKind } from 'src/app/shared/model/extra-pay-kind.model';
import { EditExtraPlayKindComponent } from '../edit-extra-play-kind/edit-extra-play-kind.component';
import { ExtraPayKindDataService } from 'src/app/shared/service/extra-pay-kind-data.service';
import { slideIn } from 'src/app/shared/animations';

@Component({
  selector: 'app-extra-pay-kind-table',
  templateUrl: './extra-pay-kind-table.component.html',
  styleUrls: ['./extra-pay-kind-table.component.scss'],
  animations: [ slideIn ]
})
export class ExtraPayKindTableComponent {
  @ViewChild(MatPaginator) myPaginator: MatPaginator;
  @ViewChild(MatSort) mySort: MatSort;
  myDataSource: MatTableDataSource<ExtraPayKind>;
  mySearchText: string;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['purpose', 'amount', 'actions'];

  constructor(private extraPayKindDataService: ExtraPayKindDataService, 
    private notificationService: NotificationService, 
    private dialog: MatDialog,
    private dialogService: DialogService) {
  }

  getPopupDialogConfig(aData?: ExtraPayKind): MatDialogConfig {
    let dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = "edit-dialog-container";
    if (aData == undefined) {
      aData = new ExtraPayKind();
    }
    dialogConfig.data = aData;
    return dialogConfig;
  }

  onCreate() {
    this.dialog.open(EditExtraPlayKindComponent, this.getPopupDialogConfig());
  }

  clearFilter(): void {
    this.mySearchText = "";
    this.applyFilter();
  }

  applyFilter() {
    this.myDataSource.filter = this.mySearchText.trim().toLowerCase();
  }

  onEdit(aData: ExtraPayKind) {
    //console.log('DEBUG: ' + JSON.stringify(aPlayer));
    this.dialog.open(EditExtraPlayKindComponent, this.getPopupDialogConfig(aData));
  }

  onDelete(aId: string){
    this.dialogService.openConfirmDialog("Are you sure to delete this record ?")
      .afterClosed().subscribe(res => {
        if (res) {
          this.extraPayKindDataService.delete(aId);
          this.notificationService.warn('Deleted successfully !');  
        }
      });
  }

  ngAfterViewInit() {
    let items: ExtraPayKind[] = [];

    this.extraPayKindDataService.getList().subscribe(dbItems => {
      items.length = 0;
      for (let i: number = 0; i < dbItems.length; i++) {
        let dbItem: DocumentChangeAction<IExtraPayKind> = dbItems[i];
        items.push(new ExtraPayKind(dbItem.payload.doc.id, dbItem.payload.doc.data()));
      }

      this.myDataSource = new MatTableDataSource(items);
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
