import { Component, OnInit } from '@angular/core';
import { AnnouncementDto } from '../announcement/announcement.dto';
import { AnnouncementService } from '../announcement/announcement.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  private announcementArray: any[] = []
  constructor(private announcementService: AnnouncementService) {
    this.announcementService = announcementService;
   }

  ngOnInit(): void {
    this.announcementService.getUser().subscribe(
      res =>{
        this.announcementArray = res
        console.log(this.announcementArray)
      },
      err =>{
        console.log(err)
      }
    )
  }

}
