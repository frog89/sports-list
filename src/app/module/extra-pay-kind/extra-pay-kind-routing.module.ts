import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExtraPayKindTableComponent } from './extra-pay-kind-table/extra-pay-kind-table.component';
import { AuthGuard } from 'src/app/shared/auth.guard';

const routes: Routes = [
  { path: "extra-pay-kind-table", component: ExtraPayKindTableComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtraPayKindRoutingModule { }
