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
      },
      err=>{
        console.log(err)
      }
    )
  }

}
