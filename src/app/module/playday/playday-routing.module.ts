import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaydayListComponent } from './playday-list.component';
import { EditPlaydayComponent } from './edit-playday/edit-playday.component';

const routes: Routes = [
   { path: "playdays", component: PlaydayListComponent },
   { path: "playdays/:id", component: EditPlaydayComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaydayRoutingModule { }