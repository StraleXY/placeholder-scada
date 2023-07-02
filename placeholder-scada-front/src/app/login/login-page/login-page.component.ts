import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

    username: string = ""
    password: string = ""

    constructor(private service: LoginService, private router: Router) {
        //service.login({username: "strahinja", password: "12345678"}).subscribe((res) => console.log(res))
    }

    onLogin(){
      this.service.login({username: this.username, password: this.password}).subscribe((res) => {
        console.log(res)
        if (res['role'] === 'admin') {
          this.router.navigate(["admin"])
        }else{
          this.router.navigate(["trending"])
        }
      })
    }
}