import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnouncementDto } from '../services/announcement/announcement.dto';
import { AnnouncementService } from '../services/announcement/announcement.service';
import { BrandService } from '../services/brand/brand.service';
import { CityService } from '../services/city/city.service';

@Component({
  selector: 'app-edit-announcement',
  templateUrl: './edit-announcement.component.html',
  styleUrls: ['./edit-announcement.component.css']
})
export class EditAnnouncementComponent implements OnInit {
  id: any
  exForm!: FormGroup;
  cityArray: any[] = []
  brandArray: any[] = []
  typeArray: any[] = []
  constructor(private route: ActivatedRoute, private announcementService: AnnouncementService,
              private cityService: CityService, private brandService: BrandService,
              private router: Router ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    let announcement;
    this.exForm = new FormGroup({
      type: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      brand: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required),
      model: new FormControl(null, Validators.required),
      power: new FormControl(null),
      mileage: new FormControl(null),
      firstOwner: new FormControl(null),
      damaged: new FormControl(null),
      capacity: new FormControl(null)

    })
    this.announcementService.getById(this.id).subscribe(
      res=>{
        announcement = res
        this.exForm.get('city')?.setValue(announcement.city)
        this.exForm.get('description')?.setValue(announcement.description)
        this.exForm.get('price')?.setValue(announcement.price)
        this.exForm.get('brand')?.setValue(announcement.brand)
        this.exForm.get('title')?.setValue(announcement.title)
        this.exForm.get('year')?.setValue(announcement.year)
        this.exForm.get('model')?.setValue(announcement.model)
        this.exForm.get('power')?.setValue(announcement.power)
        this.exForm.get('mileage')?.setValue(announcement.mileage)
        this.exForm.get('firstOwner')?.setValue(announcement.firstOwner)
        this.exForm.get('damaged')?.setValue(announcement.damaged)
        this.exForm.get('capacity')?.setValue(announcement.capacity)
        
      }
    )
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
        this.router.navigate(['/my_announcement'])

      }
    )
    this.typeArray = ['Auto', 'Motocykl', "Przyczepa", "Ciężarówka"]
  }

  editAnnouncement(){
    let announcementDto: AnnouncementDto = new AnnouncementDto;
    announcementDto.brand = this.exForm.get('brand')?.value
    announcementDto.city = this.exForm.get('city')?.value
    console.log(announcementDto.city);
    announcementDto.description = this.exForm.get('description')?.value
    announcementDto.price = this.exForm.get('price')?.value
    announcementDto.title = this.exForm.get('title')?.value
    announcementDto.type = this.exForm.get('type')?.value
    announcementDto.year = this.exForm.get('year')?.value
    announcementDto.model = this.exForm.get('model')?.value
    announcementDto.power = this.exForm.get('power')?.value
    announcementDto.mileage = this.exForm.get('mileage')?.value
    announcementDto.firstOwner = this.exForm.get('firstOwner')?.value
    announcementDto.damaged = this.exForm.get('damaged')?.value
    this.announcementService.edit(this.id, announcementDto).subscribe(
      res =>{
       console.log(res)
       let url = "/edit_images/" + res.announcementId
          this.router.navigate([url])
      },
      err =>{
        console.log(err)
      }
    )
  }

  autoGrowTextZone(e: any) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight + 25)+"px";
  }

  addValidator(){
    this.exForm.get('power')?.setValidators([Validators.required])
    this.exForm.get('mileage')?.setValidators([Validators.required])
  }

  removeValidator(){
    this.exForm.get('power')?.clearValidators
    this.exForm.get('mileage')?.setValidators([Validators.required])

  }
}


