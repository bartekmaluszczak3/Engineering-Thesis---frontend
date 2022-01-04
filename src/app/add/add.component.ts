import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnnouncementService } from '../services/announcement/announcement.service';
import { BrandService } from '../services/brand/brand.service';
import { CityService } from '../services/city/city.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  exForm!: FormGroup;
  cityArray: any[] = []
  brandArray: any[] = []

  constructor(private announcementService: AnnouncementService, private cityService: CityService, private brandService: BrandService) { }

  ngOnInit(): void {
    this.exForm = new FormGroup({
      type: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(16)]),
      city: new FormControl(null, [Validators.required]),
      title: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, [Validators.required]),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      brand: new FormControl(null, Validators.required),
    })
    // this.exForm.get('type')?.setValue('Skorpion makarov beretta')

    this.cityService.get().subscribe(
      res =>{
        this.cityArray = res
        console.log(this.cityArray)
      },
      err =>{
        localStorage.removeItem('token')
      }
    )

    this.brandService.get().subscribe(
      res =>{
        this.brandArray = res
        console.log(this.cityArray)
      },
      err =>{
        localStorage.removeItem('token')
      }
    )
  }

}


