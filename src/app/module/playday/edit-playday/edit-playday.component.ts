import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';

import { PlayDay } from 'src/app/shared/model/playday.model';
import { IPlayer, Player } from 'src/app/shared/model/player.model';
import { PlaydayDataService } from '../../../shared/service/playday-data.service';
import { MatCheckbox, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { slideIn } from '../../../shared/animations';
import { DocumentChangeAction } from 'angularfire2/firestore';
import { PlayerDataService } from 'src/app/shared/service/player-data.service';
import { UpdateMode } from 'src/app/shared/model/update-mode-type';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { SettingsDataService } from 'src/app/shared/service/settings-data.service';
import { map } from 'rxjs/operators';
import { Settings, ISettings } from 'src/app/shared/model/settings.model';
import { SaisonDataService } from 'src/app/shared/service/saison-data.service';
import { Saison, ISaison } from 'src/app/shared/model/saison.model';
import { combineLatest, Observable } from 'rxjs';

export interface PlayerItem {
  id: string;
  display: string;
}

@Component({
  selector: 'app-edit-playday',
  templateUrl: './edit-playday.component.html',
  styleUrls: ['./edit-playday.component.scss'],
  animations: [ slideIn ]
})
export class EditPlaydayComponent {
  MyUpdateMode = UpdateMode;

  myForm: FormGroup;
  myAllPlayers: Player[] = [];
  mySettings: Settings;
  myActiveSaison: Saison;
  myChoosablePlayers: PlayerItem[] = [];
  myMode: UpdateMode;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, 
      private settingsDataService: SettingsDataService,
      private saisonDataService: SaisonDataService,
      private playdayDataService: PlaydayDataService,
      private playerDataService: PlayerDataService,
      private dialogRef: MatDialogRef<EditPlaydayComponent>,
      @Inject(MAT_DIALOG_DATA) public playday: PlayDay,
      private notificationService: NotificationService) { 
    this.myMode = playday.id.length == 0 ? UpdateMode.Insert : UpdateMode.Update;
    this.myForm = this.fb.group( {
      id: new FormControl({value: null, disabled: true}),
      day: [null, Validators.compose([Validators.required])],
      saisonId: new FormControl({value: null, disabled: true}),
      isCancelled: false,
      numOfHours: 1,
      numOfCourts: 1,
      remark: ""
    });
    this.myForm.addControl("players", new FormArray([]));    

    this.myForm.validator = Validators.compose([
      this.valiDifferentPlayers(),
      this.valiCancelledAndCourtsAndHours(
        this.myForm.controls.isCancelled,
        this.myForm.controls.numOfHours,
        this.myForm.controls.numOfCourts)]);

    this.loadData();
  }

  setFormWithPlayDay() {
    this.myForm.controls.id.setValue(this.playday.id);
    this.myForm.controls.day.setValue(this.playday.dayAsDate);
    this.myForm.controls.saisonId.setValue(this.playday.saisonId);
    this.myForm.controls.isCancelled.setValue(this.playday.isCancelled);
    this.myForm.controls.numOfHours.setValue(this.playday.numOfHours);
    this.myForm.controls.numOfCourts.setValue(this.playday.numOfCourts);
    this.myForm.controls.remark.setValue(this.playday.remark);

    let formArray: FormArray = this.myForm.controls.players as FormArray;
    for (let i: number = 0; i < this.playday.playerIds.length; i++) {
      let id: string = this.playday.playerIds[i];
      let control: AbstractControl = formArray.at(i);
      control.setValue(id);
    }
  }

  setPlayDayWithForm() {
    this.playday.dayAsDate = this.myForm.controls.day.value;
    this.playday.isCancelled = this.myForm.controls.isCancelled.value;
    this.playday.numOfHours = this.myForm.controls.numOfHours.value;
    this.playday.numOfCourts = this.myForm.controls.numOfCourts.value;
    this.playday.remark = this.myForm.controls.remark.value;

    this.playday.playerIds.length = 0;
    let formArray: FormArray = this.myForm.controls.players as FormArray;
    for (let i: number = 0; i < formArray.length; i++) {
      let control: FormControl = formArray.at(i) as FormControl;
      let formPlayerId: string = control.value;
      if (formPlayerId != null && formPlayerId.length > 0) {
        this.playday.playerIds.push(control.value);
      }
    }
  }

  getSaisonName(): string {
    if (this.myActiveSaison == undefined)
      return "";
    return this.myActiveSaison.name;
  }

  getHeader(): string {
    if (this.myMode == UpdateMode.Update) {
      return `Modify PlayDay (Saison ${this.getSaisonName()})`;
    }
    return `New PlayDay (Saison ${this.getSaisonName()})`;
  }

  loadData() {
    combineLatest(
      this.settingsDataService.getList(),
      this.saisonDataService.getList(),
      this.playerDataService.getList(false)
    ).subscribe(([dbSettingsList, dbSaisonList, dbPlayerList]) => {
      if (dbSettingsList.length != 1) {
        throw new Error(`Expected is 1 settings object in DB, but ${dbSettingsList.length} have been found!`);
      }
      let dbSettings: DocumentChangeAction<ISettings> =  dbSettingsList[0];
      this.mySettings = new Settings(dbSettings.payload.doc.id, dbSettings.payload.doc.data());
      this.playday.saisonId = this.mySettings.saisonId;

      let dbActiveSaison: DocumentChangeAction<ISaison> | undefined =
        dbSaisonList.find(s => s.payload.doc.id == this.playday.saisonId);
      if (dbActiveSaison == undefined) {
        throw new Error(`Cannot find saison in DB having ID = ${this.playday.saisonId}!`);
      }
      this.myActiveSaison = new Saison(dbActiveSaison.payload.doc.id, dbActiveSaison.payload.doc.data());
      //console.log('DEBUG: ' + JSON.stringify(this.myActiveSaison));

      this.myAllPlayers.length = 0;
      for (let i: number = 0; i < dbPlayerList.length; i++) {
        let dbPlayer: DocumentChangeAction<IPlayer> = dbPlayerList[i];
        let player: Player = new Player(dbPlayer.payload.doc.id, dbPlayer.payload.doc.data())
        this.myAllPlayers.push(player);
      }

      this.initFormAfterDataLoad();
    });
  }

  valiCancelledAndCourtsAndHours(isCancelledCtrl: AbstractControl, 
      numOfHoursCtrl: AbstractControl, 
      numOfCourtsCtrl: AbstractControl) {
    return (ctrl: AbstractControl): {[key: string]: any} | null => {
      let group: FormGroup = ctrl as FormGroup;
      if (isCancelledCtrl.value && numOfHoursCtrl.value > 0)
        return { invalidCancelledButHoursGreaterZero: true };
      if (!isCancelledCtrl.value && numOfHoursCtrl.value <= 0)
        return { invalidNotCancelledButHoursZero: true };
      if (isCancelledCtrl.value && numOfCourtsCtrl.value > 0) 
        return { invalidCancelledButCourtsGreaterZero: true };
      if (!isCancelledCtrl.value && numOfCourtsCtrl.value <= 0)
        return { invalidNotCancelledButCourtsZero: true };
      return null;
    }
  }

  valiDifferentPlayers() {
    return (ctrl: AbstractControl): {[key: string]: any} | null => {
      let group: FormGroup = ctrl as FormGroup;
      let values: number[] = [];
      let arr = <FormArray>group.controls.players;
      for (let ctrl of arr.controls) {
        values.push(ctrl.value);
      }
      for (var i: number = 0; i<values.length; i++) {
        for (var j: number = i+1; j<values.length; j++) {
          if (values[i] != null && values[j] != null && values[i] == values[j]) {
            return {
              equalPlayers: true
            };
          }
        }
      }
      return null;
    }
  }
  
  initFormAfterDataLoad() : void {
    // Players have been loaded now => Set Player FormControls
    let playerFormControls: FormArray = this.myForm.get("players") as FormArray;
    this.myChoosablePlayers.length = 0;
    this.myChoosablePlayers.push({id: "", display: "-"});
      for (let i: number = 0; i < this.myAllPlayers.length; i++) {
      let player: Player = this.myAllPlayers[i];
      playerFormControls.push(new FormControl());
      this.myChoosablePlayers.push({
        id: player.id,
        display: player.shortAlias
      });
    }
    // Fill FormControls with playday players
    this.setFormWithPlayDay();
  }

  onSubmit() {
    /*
    console.log("Day: " + this.myForm.value.day);
    console.log("playerControl1: " + this.myForm.value.players[0]);
    console.log("playerControl2: " + this.myForm.value.players[1]);
    console.log("playerControl3: " + this.myForm.value.players[2]);
    console.log("playerControl4: " + this.myForm.value.players[3]);
    console.log("playerControl5: " + this.myForm.value.players[4]);
    console.log("isCancelled: " + this.myForm.value.isCancelled);
    console.log("numOfHours: " + this.myForm.value.numOfHours);
    console.log("numOfCourts: " + this.myForm.value.numOfCourts);
    */

    if (this.myForm.valid) {
      this.setPlayDayWithForm();

      let msg: string = "";
      if (this.myMode == UpdateMode.Insert) {
        this.playdayDataService.insert(this.playday);
        msg = 'Inserted successfully !'
      } else {
        this.playdayDataService.update(this.playday);
        msg = 'Updated successfully !'
      }

      this.notificationService.success(msg);

      this.dialogRef.close();
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onClearForm(): void {
    if (this.myMode == UpdateMode.Update)
      throw new Error("Clear form is allowed in insert mode only!");
    this.myForm.reset();
    this.playday.clear();
    this.setFormWithPlayDay();
  }

  onCancelClicked(cb: MatCheckbox) {
    if (cb.checked) {
      this.myForm.controls.numOfHours.setValue(1);
      this.myForm.controls.numOfCourts.setValue(1);
    } else {
      this.myForm.controls.numOfHours.setValue(0);
      this.myForm.controls.numOfCourts.setValue(0);
    }
  }

}
