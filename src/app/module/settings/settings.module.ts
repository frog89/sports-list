import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatSnackBarModule, MatToolbarModule, MatSelectModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditSettingsComponent } from './edit-settings.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    EditSettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSelectModule
  ]
})
export class SettingsModule { }
