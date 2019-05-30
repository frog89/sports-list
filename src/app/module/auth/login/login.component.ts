import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
  }

}
