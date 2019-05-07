import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditPlaydayComponent } from './edit-playday/edit-playday.component';
import { PlaydayTableComponent } from './playday-table/playday-table.component';

const routes: Routes = [
   { path: "playday-table", component: PlaydayTableComponent },
   { path: "edit-playday/:id", component: EditPlaydayComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaydayRoutingModule { }