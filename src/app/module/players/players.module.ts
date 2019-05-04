import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersRoutingModule } from './players-routing.module';
import { EditPlayersComponent } from './edit-players.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatButtonModule, MatCheckboxModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    FlexLayoutModule
  ]
})
export class PlayersModule { }
