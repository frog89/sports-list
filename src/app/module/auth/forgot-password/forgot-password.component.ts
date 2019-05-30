import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../auth.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
  }

}
