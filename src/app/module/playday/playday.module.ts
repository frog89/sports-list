import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PlaydayRoutingModule } from './playday-routing.module';
import { PlaydayTableComponent } from './playday-table/playday-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatFormField, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatOptionModule, MatSelectModule, MatCheckboxModule, MatCardModule, MatIconModule, MatButtonModule, MatToolbarModule } from '@angular/material';
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
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule
  ],
  exports: [
  ],
  providers: []
})
export class PlaydayModule { }