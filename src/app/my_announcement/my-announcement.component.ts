import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../services/announcement/announcement.service';
import { mapImageList } from '../shared/utils';

@Component({
  selector: 'app-my-announcement',
  templateUrl: './my-announcement.component.html',
  styleUrls: ['./my-announcement.component.css']
})

export class MyAnnouncementComponent implements OnInit {
  announcementArray: any[] = []
  constructor(private announcementService: AnnouncementService) { }

  ngOnInit(): void {
    this.announcementService.getUser().subscribe(
      res=>{
        this.announcementArray = res
        this.announcementArray.forEach(element =>{
          element.imagesBytes = mapImageList(element.imagesBytes)
        })
        console.log(this.announcementArray)
      },
      err=>{
        console.log(err)
      }
    )
  }
  delete(id:any){
    
  }
}
