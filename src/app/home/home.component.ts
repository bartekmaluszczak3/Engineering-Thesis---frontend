import { Component, OnInit } from '@angular/core';
import { AnnouncementDto } from '../announcement/announcement.dto';
import { AnnouncementService } from '../announcement/announcement.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  constructor(private announcementService: AnnouncementService) {
    this.announcementService = announcementService;
   }

  ngOnInit(): void {
    let announcementDto: AnnouncementDto = new AnnouncementDto;
    announcementDto.city = "Lodz"
    announcementDto.description = "chuj"
    announcementDto.price = 12
    announcementDto.title = "sadsa"
    announcementDto.type = "CAR"
    this.announcementService.create(announcementDto).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
    console.log("elo")
  }

}
