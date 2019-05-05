import { FormControl, NgForm, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

export class AppErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, _form: NgForm | FormGroupDirective | null) {
    return control && control.invalid && control.touched;
  }
}