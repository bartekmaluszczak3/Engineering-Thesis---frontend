import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { CityService } from '../services/city/city.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  exForm!: FormGroup
  cityArray: any[] = []
  constructor(private authService: AuthService, private router: Router, private cityService: CityService) { }

  ngOnInit(): void {
    this.exForm = new FormGroup({
      phone: new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      city: new FormControl(null, [Validators.required]),
    })

    this.cityService.get().subscribe(
      res =>{
        this.cityArray = res
      }
    )
  }

  edit(){
    this.authService.update(this.exForm.get('phone')?.value, this.exForm.get('city')?.value).subscribe(
      res =>{
        console.log(res)
      }
    )
  }
}
