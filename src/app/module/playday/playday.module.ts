import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PlaydayRoutingModule } from './playday-routing.module';
import { PlaydayTableComponent } from './playday-table/playday-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatFormField, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatOptionModule, MatSelectModule, MatCheckboxModule, MatCardModule } from '@angular/material';
import { EditPlaydayComponent } from './edit-playday/edit-playday.component';

@NgModule({
  declarations: [
    PlaydayTableComponent,
    EditPlaydayComponent
  ],
  imports: [
    PlaydayRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  exports: [
  ],
  providers: []
})
export class PlaydayModule { }