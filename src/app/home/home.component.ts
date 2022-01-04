import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../services/history/history.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  announcementArray: any[] = []
  constructor(private historyService: HistoryService) {
    this.historyService = historyService;
   }

  ngOnInit(): void {
    this.historyService.get().subscribe(
      res =>{
        this.announcementArray = res
        console.log(this.announcementArray)
      },
      err =>{
        localStorage.removeItem('token')
      }
    )
  }

}
