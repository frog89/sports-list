import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaisonTableComponent } from './saison-table/saison-table.component';

const routes: Routes = [
  { path: "saison-table", component: SaisonTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaisonRoutingModule { }
