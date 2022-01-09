import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnouncementService } from '../services/announcement/announcement.service';
import { FavouriteService } from '../services/favourite/favourite.service';
import { HistoryService } from '../services/history/history.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  private id: any = this.route.snapshot.paramMap.get('id')
  isOwner: boolean = true
  favourite: boolean = false
  announcement: any =   this.announcementService.getById(this.id).subscribe(
    res=>{
      this.announcement = res
      this.announcement.imageBytes = "data:image/JPEG;base64," + res.imageBytes;
      console.log(this.announcement)
    }
  )
  constructor( private route: ActivatedRoute, private announcementService: AnnouncementService, private historyService: HistoryService,
              private favouriteService: FavouriteService) { }

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
      },
      err=>{
        console.log(err)
      }
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

}