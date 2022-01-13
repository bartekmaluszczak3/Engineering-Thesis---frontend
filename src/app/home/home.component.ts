import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandService } from '../services/brand/brand.service';
import { CityService } from '../services/city/city.service';
import { HistoryService } from '../services/history/history.service';
import { mapImageList } from '../shared/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  exForm!: FormGroup;
  announcementArray: any[] = []
  brandArray: any[] = []
  cityArray: any[] = []
  constructor(private historyService: HistoryService, private brandService: BrandService, private cityService: CityService,
              private router: Router) {}

  ngOnInit(): void {
    this.exForm = new FormGroup({
      type: new FormControl(null),
      brand: new FormControl(null),
      city: new FormControl(null),
      minPrice: new FormControl(null),
      maxPrice: new FormControl(null),
      damaged: new FormControl(null),
      minYear: new FormControl(null),
      maxYear: new FormControl(null)
    })
    this.historyService.get().subscribe(
      res =>{
        this.announcementArray = res
        this.announcementArray.forEach(element =>{
          element.imagesBytes = mapImageList(element.imagesBytes)
        })
        console.log(this.announcementArray)
      },
      err =>{
        localStorage.removeItem('token')
      }
    )

    this.brandService.get().subscribe(
      res =>{
        this.brandArray = res
      }
    )

    this.cityService.get().subscribe(
      res =>{
        this.cityArray = res
      }
    )
  }

  search(){
    let type = this.exForm.get('type')?.value
    let damaged = this.exForm.get('damaged')?.value
    let brand = this.exForm.get('brand')?.value
    let city = this.exForm.get('city')?.value
    let minPrice = this.exForm.get('minPrice')?.value
    let maxPrice = this.exForm.get('maxPrice')?.value
    let firstOwner = this.exForm.get('firstOwner')?.value
    let minYear = this.exForm.get('minYear')?.value
    let maxYear = this.exForm.get('maxYear')?.value
    let map = new Map<String, String>();
    var dict = {};
    console.log(dict);
    if(!!type){
      map.set('type', type)
    }
    if(!!damaged){
      map.set("damaged", damaged)
    }
    if(!!brand){
      map.set('brand', brand)
    }
    if(!!city){
      map.set('city', city)
    }
    if(!!minPrice){
      map.set('minPrice', minPrice)
    }
    if(!!maxPrice){
      map.set('maxPrice', maxPrice)
    }
    if(!!firstOwner){
      map.set('firstOwner', firstOwner)
    }
    if(!!minYear){
      map.set('minYear', minYear)
    }
    if(!!maxYear){
      map.set('maxYear', maxYear)
    }
    this.router.navigateByUrl(this.getUrl("/search", map))
  }
  getUrl(mapping: string, params:Map<String, String>){
    let url =  mapping + "?"
    params.forEach((value: String, key:String) =>{
      url+=key + "=" + value + "&"
    })
    return url.substring(0, url.length - 1)    
  }
}
