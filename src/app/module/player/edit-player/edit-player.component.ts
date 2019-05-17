import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Player } from 'src/app/shared/model/player.model';
import { slideIn } from '../../../shared/animations';
import { NotificationService } from '../../../shared/notification.service';
import { UpdateMode } from 'src/app/shared/model/update-mode-type';
import { PlayerDataService } from 'src/app/shared/player-data.service';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss'],
  animations: [ slideIn ]
})
export class EditPlayerComponent implements OnInit {
  MyUpdateMode = UpdateMode;
  private myForm: FormGroup;
  private myMode: UpdateMode;

  constructor(private playerDataService: PlayerDataService, 
      private dialogRef: MatDialogRef<EditPlayerComponent>,
      @Inject(MAT_DIALOG_DATA) public player: Player,
      private notificationService: NotificationService,
      ) {
    //console.log('DEBUG: ' + JSON.stringify(this.player));
    this.myMode = player.id.length == 0 ? UpdateMode.Insert : UpdateMode.Update;
    this.myForm = new FormGroup({
      id: new FormControl({value: null, disabled: true}),
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      shortAlias: new FormControl("", [Validators.required, Validators.maxLength(10)]),
      isActive: new FormControl(true)
    });
    this.setFormWithPlayer();
  }

  setFormWithPlayer() {
    this.myForm.setValue({
      id: this.player.id,
      firstName: this.player.firstName,
      lastName: this.player.lastName,
      shortAlias: this.player.shortAlias,
      isActive: this.player.isActive
    });
  }

  setPlayerWithForm() {
    this.player.id = this.myForm.controls.id.value;
    this.player.firstName = this.myForm.controls.firstName.value;
    this.player.lastName = this.myForm.controls.lastName.value;
    this.player.shortAlias = this.myForm.controls.shortAlias.value;
    this.player.isActive = this.myForm.controls.isActive.value;
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.setPlayerWithForm();

      let msg: string = "";
      if (this.myMode == UpdateMode.Insert) {
        this.playerDataService.insert(this.player);
        msg = 'Inserted successfully !'
      } else {
        this.playerDataService.update(this.player);
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
    this.player.clear();
    this.setFormWithPlayer();
  }
}
