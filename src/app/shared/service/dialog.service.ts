import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { MatConfirmDialogComponent } from '../mat-confirm-dialog/mat-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  openConfirmDialog(msg: string): MatDialogRef<MatConfirmDialogComponent> {
    return this.dialog.open(MatConfirmDialogComponent, {
      width: '390px',
      panelClass: 'padding0px',
      disableClose: false,
      position: {
        top: "10px"
      },
      data: {
        message: msg
      }
    });
  }
}
