import { NgModule } from '@angular/core';

import { PlaydayRoutingModule } from './playday-routing.module';
import { PlaydayListComponent } from './playday-list.component';
import { PlaydayTableComponent } from './playday-table/playday-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatFormField, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatOptionModule, MatSelectModule, MatCheckboxModule, MatGridListModule, MatCardModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { EditPlaydayComponent } from './edit-playday/edit-playday.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PlaydayListComponent,
    PlaydayTableComponent,
    EditPlaydayComponent
  ],
  imports: [
    PlaydayRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatGridListModule,
    MatCardModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    PlaydayListComponent
  ],
  providers: []
})
export class PlaydayModule { }