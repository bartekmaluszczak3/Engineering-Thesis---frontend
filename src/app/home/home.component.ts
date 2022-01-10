import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../services/history/history.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  announcementArray: any[] = []
  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    this.historyService.get().subscribe(
      res =>{
        this.announcementArray = res
        this.announcementArray.forEach(element =>{
          element.imageBytes = "data:image/JPEG;base64," + element.imageBytes;
        })
        console.log(this.announcementArray)
      },
      err =>{
        localStorage.removeItem('token')
      }
    )
  }

}
