import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersRoutingModule } from './players-routing.module';
import { EditPlayersComponent } from './edit-players.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatButtonModule, MatCheckboxModule, MatDialogModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditPlayersComponent
  ],
  imports: [
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
    FormsModule
  ]
})
export class PlayersModule { }
