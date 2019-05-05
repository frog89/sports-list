import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../../../shared/data.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Player } from 'src/app/shared/model/player.model';
import { slideIn } from '../../../shared/animations';
import { NotificationService } from '../../../shared/notification.service';

export enum Mode {
  Insert,
  Update
}

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss'],
  animations: [ slideIn ]
})
export class EditPlayerComponent implements OnInit {
  private form: FormGroup;
  Mode = Mode;
  private mode: Mode;

  constructor(private dataService: DataService, 
      private dialogRef: MatDialogRef<EditPlayerComponent>,
      @Inject(MAT_DIALOG_DATA) public player: Player,
      private notificationService: NotificationService,
      ) {
    //console.log('DEBUG: ' + JSON.stringify(this.player));
    this.mode = player.id.length == 0 ? Mode.Insert : Mode.Update;
    this.form = new FormGroup({
      id: new FormControl({value: null, disabled: true}),
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      shortAlias: new FormControl("", [Validators.required, Validators.maxLength(10)]),
      isActive: new FormControl(true)
    });
    this.setFormWithPlayer();
  }

  setFormWithPlayer() {
    this.form.setValue({
      id: this.player.id,
      firstName: this.player.firstName,
      lastName: this.player.lastName,
      shortAlias: this.player.shortAlias,
      isActive: this.player.isActive
    });
  }

  setPlayerWithForm() {
    this.player.id = this.form.controls.id.value;
    this.player.firstName = this.form.controls.firstName.value;
    this.player.lastName = this.form.controls.lastName.value;
    this.player.shortAlias = this.form.controls.shortAlias.value;
    this.player.isActive = this.form.controls.isActive.value;
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.valid) {
      this.setPlayerWithForm();

      let msg: string = "";
      if (this.mode == Mode.Insert) {
        this.dataService.insertPlayer(this.player);
        msg = 'Inserted successfully!'
      } else {
        this.dataService.updatePlayer(this.player);
        msg = 'Updated successfully!'
      }

      this.notificationService.success(msg);

      this.dialogRef.close();
    }
  }

  onClearForm(): void {
    if (this.mode == Mode.Update)
      throw new Error("Clear form is allowed in insert mode only!");
    this.form.reset();
    this.player.clear();
    this.setFormWithPlayer();
  }
}
