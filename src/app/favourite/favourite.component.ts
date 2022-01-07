import { Component, OnInit } from '@angular/core';
import { FavouriteService } from '../services/favourite/favourite.service';

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
          console.log(this.announcementArray)
      },
      err=>{
          console.log(err)
      }
    )
   
  }

}
