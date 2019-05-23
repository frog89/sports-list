import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaisonTableComponent } from './saison-table/saison-table.component';
import { AuthGuard } from 'src/app/shared/service/auth.guard';

const routes: Routes = [
  { path: "saison-table", component: SaisonTableComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaisonRoutingModule { }
