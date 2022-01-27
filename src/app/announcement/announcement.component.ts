import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnouncementService } from '../services/announcement/announcement.service';
import { AuthService } from '../services/auth/auth.service';
import { FavouriteService } from '../services/favourite/favourite.service';
import { HistoryService } from '../services/history/history.service';
import { mapImageList } from '../shared/utils';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  private id: any = this.route.snapshot.paramMap.get('id')
  isOwner: boolean = true
  favourite: boolean = false
  phone: any
  startIndex: number = 0
  announcement: any =   this.announcementService.getById(this.id).subscribe(
    res=>{
      this.announcement = res
      this.announcement.imagesBytes = mapImageList(this.announcement.imagesBytes);
      console.log(this.announcement)
      this.authService.getPhone(this.announcement.ownerLogin).subscribe(res=>{
        this.phone = res
        console.log("Res = ", res)
      })
      console.log(this.phone)
    }
  )
  constructor( private route: ActivatedRoute, private announcementService: AnnouncementService, private historyService: HistoryService,
              private favouriteService: FavouriteService, private authService: AuthService) { }

  ngOnInit(): void {
    this.historyService.add(this.id).subscribe(
      res=>{
        console.log(res)
      }
    )
    this.announcementService.checkOwner(this.id).subscribe(
      res=>{
        this.isOwner = res
        console.log(this.isOwner)
        if(this.isOwner == false)
          this.announcementService.increaseView(this.id).subscribe()
      },
    )

    this.favouriteService.check(this.id).subscribe(
      res =>{
          this.favourite = res
          console.log(this.favourite)
      },
      err =>{
        console.log(err)
      }
    )
  
  }
  toggleFavourite(){
    this.favourite = ! this.favourite
    this.favouriteService.toggle(this.id).subscribe(
      res=>{
        console.log(res) 
      }
    )
  }

  getPhone(){
    document.getElementById('button')?.remove()
    let div = document.createElement('div')
    div.appendChild(document.createTextNode(this.phone))
    document.getElementById('phoneDiv')?.appendChild(div)
  }
  
  change(id:any){
    this.startIndex = id
  }
}
