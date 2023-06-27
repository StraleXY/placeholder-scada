import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

    constructor(private service: LoginService) {
        // service.login({username: "strahinja", password: "12345678"}).subscribe((res) => console.log(res))
    }

}
