import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditSettingsComponent } from './edit-settings.component';

const routes: Routes = [
  { path: "edit-settings", component: EditSettingsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
