import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth.scss']
})
export class SignupComponent implements OnInit {

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
  }
}
