import { Component, OnInit } from '@angular/core';
import { FavouriteService } from '../services/favourite/favourite.service';
import { mapImageList } from '../shared/utils';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  announcementArray: any[] = []

  constructor(private favouriteService: FavouriteService) { }

  ngOnInit(): void {
    this.favouriteService.get().subscribe(
      res=>{
          this.announcementArray = res
          console.log(res)
          this.announcementArray.forEach(element =>{
            element.imagesBytes = mapImageList(element.imagesBytes)
          })
      },
      err=>{
          console.log(err)
      }
    )
   
  }

}
