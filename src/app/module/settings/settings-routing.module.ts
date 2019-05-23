import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditSettingsComponent } from './edit-settings.component';
import { AuthGuard } from 'src/app/shared/service/auth.guard';

const routes: Routes = [
  { path: "edit-settings", component: EditSettingsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
