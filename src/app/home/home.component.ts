import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../services/history/history.service';
import { mapImageList } from '../shared/utils';

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
          element.imagesBytes = mapImageList(element.imagesBytes)
        })
        console.log(this.announcementArray)
      },
      err =>{
        localStorage.removeItem('token')
      }
    )
  }

}
