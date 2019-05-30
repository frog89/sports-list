import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UpdateMode } from 'src/app/shared/model/update-mode-type';
import { PlayerDataService } from 'src/app/shared/service/player-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditPlayerComponent } from '../../player/edit-player/edit-player.component';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { ExtraPayKind } from 'src/app/shared/model/extra-pay-kind.model';
import { ExtraPayKindDataService } from 'src/app/shared/service/extra-pay-kind-data.service';

@Component({
  selector: 'app-edit-extra-play-kind',
  templateUrl: './edit-extra-play-kind.component.html',
  styleUrls: ['./edit-extra-play-kind.component.scss']
})
export class EditExtraPlayKindComponent implements OnInit {
  MyUpdateMode = UpdateMode;
  myForm: FormGroup;
  myMode: UpdateMode;

  constructor(private extraPayKindDataService: ExtraPayKindDataService, 
      private dialogRef: MatDialogRef<EditPlayerComponent>,
      @Inject(MAT_DIALOG_DATA) public data: ExtraPayKind,
      private notificationService: NotificationService) {
    //console.log('DEBUG: ' + JSON.stringify(this.player));
    this.myMode = data.id.length == 0 ? UpdateMode.Insert : UpdateMode.Update;
    this.myForm = new FormGroup({
      id: new FormControl({value: null, disabled: true}),
      purpose: new FormControl("", Validators.required),
      amount: new FormControl("", Validators.required)
    });
    this.setFormWithData();
  }

  setFormWithData() {
    this.myForm.setValue({
      id: this.data.id,
      purpose: this.data.purpose,
      amount: this.data.amount
    });
  }

  setDataWithForm() {
    this.data.purpose = this.myForm.controls.purpose.value;
    this.data.amount = this.myForm.controls.amount.value;
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.setDataWithForm();

      let msg: string = "";
      if (this.myMode == UpdateMode.Insert) {
        this.extraPayKindDataService.insert(this.data);
        msg = 'Inserted successfully !'
      } else {
        this.extraPayKindDataService.update(this.data);
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
    this.data.clear();
    this.setFormWithData();
  }
}
