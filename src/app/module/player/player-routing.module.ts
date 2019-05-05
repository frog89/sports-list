import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerTableComponent } from './player-table/player-table.component';

const routes: Routes = [
  { path: "player-table", component: PlayerTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersRoutingModule { }
