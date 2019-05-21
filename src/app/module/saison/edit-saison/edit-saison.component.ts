import { Component, OnInit, Inject } from '@angular/core';
import { UpdateMode } from 'src/app/shared/model/update-mode-type';
import { slideIn } from 'src/app/shared/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Saison } from 'src/app/shared/model/saison.model';
import { NotificationService } from 'src/app/shared/notification.service';
import { SaisonDataService } from 'src/app/shared/saison-data.service';

@Component({
  selector: 'app-edit-saison',
  templateUrl: './edit-saison.component.html',
  styleUrls: ['./edit-saison.component.scss'],
  animations: [ slideIn ]
})
export class EditSaisonComponent implements OnInit {
  MyUpdateMode = UpdateMode;
  private myForm: FormGroup;
  private myMode: UpdateMode;

  constructor(private saisonDataService: SaisonDataService, 
      private dialogRef: MatDialogRef<EditSaisonComponent>,
      @Inject(MAT_DIALOG_DATA) public saison: Saison,
      private notificationService: NotificationService,
    ) {
    //console.log('DEBUG: ' + JSON.stringify(this.player));
    this.myMode = saison.id.length == 0 ? UpdateMode.Insert : UpdateMode.Update;
    this.myForm = new FormGroup({
      id: new FormControl({value: null, disabled: true}),
      name: new FormControl(null, Validators.required),
      dayFrom: new FormControl(null, Validators.required),
      dayTo: new FormControl(null, Validators.required)
    });
    this.setFormWithSaison();
  }

  ngOnInit() {
  }

  setFormWithSaison() {
    this.myForm.setValue({
      id: this.saison.id,
      name: this.saison.name,
      dayFrom: this.saison.dayFromAsDate,
      dayTo: this.saison.dayToAsDate
    });
  }

  setSaisonWithForm() {
    this.saison.name = this.myForm.controls.name.value;
    this.saison.dayFromAsDate = this.myForm.controls.dayFrom.value;
    this.saison.dayToAsDate = this.myForm.controls.dayTo.value;
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.setSaisonWithForm();

      let msg: string = "";
      if (this.myMode == UpdateMode.Insert) {
        this.saisonDataService.insert(this.saison);
        msg = 'Inserted successfully !'
      } else {
        this.saisonDataService.update(this.saison);
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
    this.saison.clear();
    this.setFormWithSaison();
  }
}
