import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';

import { PlayDay } from 'src/app/shared/model/playday.model';
import { IPlayer, Player } from 'src/app/shared/model/player.model';
import { PlaydayDataService } from '../../../shared/playday-data.service';
import { MatCheckbox, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { slideIn } from '../../../shared/animations';
import { DocumentChangeAction } from 'angularfire2/firestore';
import { PlayerDataService } from 'src/app/shared/player-data.service';
import { UpdateMode } from 'src/app/shared/model/update-mode-type';
import { NotificationService } from 'src/app/shared/notification.service';

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
  myChoosablePlayers: PlayerItem[] = [];
  myMode: UpdateMode;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, 
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

    this.loadPlayers();
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

  loadPlayers() {
    // Fetch Playday for passed id
    this.playerDataService.getList(false).subscribe(
      dbPlayers => {
        this.myAllPlayers.length = 0;
        for (let i: number = 0; i < dbPlayers.length; i++) {
          let player: DocumentChangeAction<IPlayer> = dbPlayers[i];
          this.myAllPlayers.push(new Player(player.payload.doc.id, player.payload.doc.data()));
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
    for (let i: number = 0; i < this.myAllPlayers.length; i++) {
      let player: Player = this.myAllPlayers[i];
      playerFormControls.push(new FormControl());
      this.myChoosablePlayers.push({
        id: player.id,
        display: player.getFullName()
      });
    }
    // Fill FormControls with playday players
    this.setFormWithPlayDay();
  }

  onSubmit() {
    console.log("Day: " + this.myForm.value.day);
    console.log("playerControl1: " + this.myForm.value.players[0]);
    console.log("playerControl2: " + this.myForm.value.players[1]);
    console.log("playerControl3: " + this.myForm.value.players[2]);
    console.log("playerControl4: " + this.myForm.value.players[3]);
    console.log("playerControl5: " + this.myForm.value.players[4]);
    console.log("isCancelled: " + this.myForm.value.isCancelled);
    console.log("numOfHours: " + this.myForm.value.numOfHours);
    console.log("numOfCourts: " + this.myForm.value.numOfCourts);

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
