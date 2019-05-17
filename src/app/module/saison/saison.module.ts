import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaisonRoutingModule } from './saison-routing.module';
import { EditSaisonComponent } from './edit-saison/edit-saison.component';
import { SaisonTableComponent } from './saison-table/saison-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatSnackBarModule, MatDatepickerModule, MatToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    EditSaisonComponent, 
    SaisonTableComponent
  ],
  imports: [
    CommonModule,
    SaisonRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    FlexLayoutModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatToolbarModule,
    SharedModule
  ],
  entryComponents: [
    EditSaisonComponent
  ]
})
export class SaisonModule { }
