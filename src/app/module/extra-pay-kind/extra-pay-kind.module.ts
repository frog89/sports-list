import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtraPayKindRoutingModule } from './extra-pay-kind-routing.module';
import { PlayersRoutingModule } from '../player/player-routing.module';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatSnackBarModule, MatToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditExtraPlayKindComponent } from './edit-extra-play-kind/edit-extra-play-kind.component';
import { ExtraPayKindTableComponent } from './extra-pay-kind-table/extra-pay-kind-table.component';

@NgModule({
  declarations: [
    ExtraPayKindTableComponent,
    EditExtraPlayKindComponent
  ],
  imports: [
    CommonModule,
    ExtraPayKindRoutingModule,
    CommonModule,
    PlayersRoutingModule,
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
    MatToolbarModule,
    SharedModule
  ],
  entryComponents: [
    EditExtraPlayKindComponent
  ]
})
export class ExtraPayKindModule { }
