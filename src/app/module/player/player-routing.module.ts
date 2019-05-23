import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerTableComponent } from './player-table/player-table.component';
import { AuthGuard } from 'src/app/shared/auth.guard';

const routes: Routes = [
  { path: "player-table", component: PlayerTableComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersRoutingModule { }
