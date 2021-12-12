import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RegisterDto } from './register.dto';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { validate } from './utils.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  exForm!: FormGroup;
  status_code = 0
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.exForm = new FormGroup({
      login: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(16)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, [Validators.required])
    })
  }

  registerUser(){
    let registerDto: RegisterDto = new RegisterDto;
    registerDto.login = this.exForm.get('login')?.value
    registerDto.email = this.exForm.get('email')?.value
    this.exForm.get('login')?.hasError('required')
    registerDto.password = this.exForm.get('password')?.value
    this.authService.registerUser(registerDto).subscribe(
      res => {
        console.log(res),
        this.router.navigate(['/login'])
      },
      err => {
        console.log(err)
        this.status_code = 500
      }
    )
  }

}
