import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { LoginDto } from './login.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  exForm!: FormGroup;
  constructor(private authService: AuthService, private router: Router) { }
    error_message = ''

  ngOnInit(): void {
    this.exForm = new FormGroup({
      login: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required])
    });
  }

  loginUser(){
    let loginDto: LoginDto = new LoginDto;
    loginDto.login = this.exForm.get('login')?.value
    loginDto.password = this.exForm.get('password')?.value
    console.log(loginDto)
    this.authService.loginUser(loginDto).subscribe(
      res => {
        localStorage.setItem('token', res.token)
        
        this.router.navigate(['/home'])

      },
      err => {
        console.log(err)
        if(err.error.message == undefined){
          this.error_message = "Nie masz polaczenia z serwerem"
        }
        else if(err.error.message == 'User is disabled'){
          this.error_message = "Uzytkownik jest zbanowany"
        }
        else if(err.error.message == "Bad credentials"){
          this.error_message = "Niepoprawne dane logowania"
        }
      }
    )
      
  }
}
