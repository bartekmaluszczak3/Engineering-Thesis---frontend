import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnouncementDto } from '../services/announcement/announcement.dto';
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

  constructor(private announcementService: AnnouncementService, private cityService: CityService, private brandService: BrandService,
              private router: Router) { }

  ngOnInit(): void {
    this.exForm = new FormGroup({
      type: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(16)]),
      city: new FormControl(null, [Validators.required]),
      title: new FormControl(null, Validators.required),
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
  autoGrowTextZone(e: any) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight + 25)+"px";
  }

  addAnnouncement(){
    let announcementDto: AnnouncementDto = new AnnouncementDto;
    announcementDto.brand = this.exForm.get('brand')?.value
    announcementDto.city = this.exForm.get('city')?.value
    announcementDto.description = this.exForm.get('description')?.value
    announcementDto.price = this.exForm.get('price')?.value
    announcementDto.title = this.exForm.get('title')?.value
    announcementDto.type = this.exForm.get('type')?.value
    this.announcementService.create(announcementDto).subscribe(
      res =>{
          console.log(res)
          let url = "/add_image/" + res.announcementId
          this.router.navigate([url])
      },
      err =>{
        console.log(err)
      }
    )
  }
}


