import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username: string = ""
  password: string = ""
  constructor(private loginService: LoginService) {

  }

  register() {
    console.log(this.username, this.password)
    if (this.username == "" || this.password == "") return; 
    this.loginService.register({"username": this.username, "password": this.password}).subscribe({
      next: _ => alert("Registration successful!"),
      error: _ => alert("User with that username exists")
    })
  }
}
