import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginDto } from './login.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  exForm!: FormGroup;
  constructor(private authService: AuthService, private router: Router) { }
  status_code = 10

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
      this.status_code =  err.status
      }
    )
      
  }
}
