import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private route: ActivatedRoute, private announcementService: AnnouncementService,
              private cityService: CityService, private brandService: BrandService,
              private router: Router ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    let announcement;
    this.exForm = new FormGroup({
      type: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(16)]),
      city: new FormControl(null, [Validators.required]),
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      brand: new FormControl(null, Validators.required),
    })
    this.announcementService.getById(this.id).subscribe(
      res=>{
        announcement = res
        this.exForm.get('type')?.setValue(announcement.type)
        this.exForm.get('city')?.setValue(announcement.city)
        this.exForm.get('description')?.setValue(announcement.description)
        this.exForm.get('price')?.setValue(announcement.price)
        this.exForm.get('brand')?.setValue(announcement.brand)
        this.exForm.get('title')?.setValue(announcement.title)

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
  }

  editAnnouncement(){
    let map: Map<string, string> = new Map
    map.set('id', this.id)
    map.set('type', this.exForm.get('type')?.value)
    map.set('city', this.exForm.get('city')?.value)
    map.set('price', this.exForm.get('price')?.value)
    map.set('brand', this.exForm.get('brand')?.value)
    map.set('title', this.exForm.get('title')?.value)
    map.set('description', this.exForm.get('description')?.value)

    this.announcementService.edit(map).subscribe(
      res =>{
       console.log(res)
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
}


