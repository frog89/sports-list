import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { MatDialogModule, MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [
    MatConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    MatConfirmDialogComponent
  ],
  entryComponents: [
    MatConfirmDialogComponent
  ]
})
export class SharedModule { }
