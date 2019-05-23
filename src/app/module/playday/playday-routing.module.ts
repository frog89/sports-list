import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditPlaydayComponent } from './edit-playday/edit-playday.component';
import { PlaydayTableComponent } from './playday-table/playday-table.component';
import { AuthGuard } from 'src/app/shared/service/auth.guard';

const routes: Routes = [
   { path: "playday-table", component: PlaydayTableComponent, canActivate: [AuthGuard] },
   { path: "edit-playday/:id", component: EditPlaydayComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaydayRoutingModule { }