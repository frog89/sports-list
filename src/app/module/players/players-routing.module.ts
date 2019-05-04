import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditPlayersComponent } from './edit-players.component';

const routes: Routes = [
  { path: "edit-players", component: EditPlayersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersRoutingModule { }
