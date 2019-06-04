import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { slideIn } from 'src/app/shared/animations';
import { SettingsDataService } from 'src/app/shared/service/settings-data.service';
import { Settings, ISettings } from 'src/app/shared/model/settings.model';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { DocumentChangeAction } from 'angularfire2/firestore';
import { Saison, ISaison } from 'src/app/shared/model/saison.model';
import { SaisonDataService } from 'src/app/shared/service/saison-data.service';
import { SettingsService } from 'src/app/shared/service/settings.service';
import { ExtraPayKind, IExtraPayKind } from 'src/app/shared/model/extra-pay-kind.model';
import { ExtraPayKindDataService } from 'src/app/shared/service/extra-pay-kind-data.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-edit-settings',
  templateUrl: './edit-settings.component.html',
  styleUrls: ['./edit-settings.component.scss'],
  animations: [ slideIn ]
})
export class EditSettingsComponent implements OnInit {
  myForm: FormGroup;
  mySaisons: Saison[] = [];
  myExtraPayKinds: ExtraPayKind[] = [];
  mySettings: Settings;

  constructor(private settingsService: SettingsService, 
      private saisonDataService: SaisonDataService, 
      private extraPayKindDataService: ExtraPayKindDataService, 
      private notificationService: NotificationService) {
    let settings: Settings | null = this.settingsService.settings$.getValue();
    if (settings == null) {
      throw new Error("Settings are not allowed to be null !");
    }
    this.mySettings = settings;
    //console.log('DEBUG: ' + JSON.stringify(this.mySettings));
    this.myForm = new FormGroup({
      id: new FormControl({value: null, disabled: true}),
      sportName: new FormControl("", Validators.required),
      saisonId: new FormControl("", Validators.required),
      extraPayKindId: new FormControl("", Validators.required),
      extraPayAmount: new FormControl(0),
    });
    this.loadData();
  }

  loadData() {
    combineLatest(
      this.saisonDataService.getList(),
      this.extraPayKindDataService.getList()
    ).subscribe(([dbSaisonList, dbExtraPayKindList]) => {
      this.mySaisons.length = 0;
      for (let i: number = 0; i < dbSaisonList.length; i++) {
        let dbSaison: DocumentChangeAction<ISaison> = dbSaisonList[i];
        this.mySaisons.push(
          new Saison(dbSaison.payload.doc.id, dbSaison.payload.doc.data())
        );
      }
      this.myExtraPayKinds.length = 0;
      for (let i: number = 0; i < dbExtraPayKindList.length; i++) {
        let dbKind: DocumentChangeAction<IExtraPayKind> = dbExtraPayKindList[i];
        this.myExtraPayKinds.push(
          new ExtraPayKind(dbKind.payload.doc.id, dbKind.payload.doc.data())
        );
      }

      this.setFormWithSettings();
    });
  }

  setFormWithSettings() {
    this.myForm.setValue({
      id: this.mySettings.id,
      sportName: this.mySettings.sportName,
      saisonId: this.mySettings.saisonId,
      extraPayKindId: this.mySettings.extraPayKindId,
      extraPayAmount: this.mySettings.extraPayAmount
    });
  }

  setSettingsWithForm() {
    this.mySettings.sportName = this.myForm.controls.sportName.value;
    this.mySettings.saisonId = this.myForm.controls.saisonId.value;
    this.mySettings.extraPayKindId = this.myForm.controls.extraPayKindId.value;
    this.mySettings.extraPayAmount = this.myForm.controls.extraPayAmount.value;
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.setSettingsWithForm();

      this.settingsService.update(this.mySettings);
      this.notificationService.success('Updated successfully !');
    }
  }
}
