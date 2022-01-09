import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../services/announcement/announcement.service';

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
          element.imageBytes = "data:image/JPEG;base64," + element.imageBytes;
        })
        console.log(this.announcementArray)
      },
      err=>{
        console.log(err)
      }
    )
  }

}
