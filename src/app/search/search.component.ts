import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { AnnouncementService } from '../services/announcement/announcement.service';
import { mapImageList } from '../shared/utils';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  announcementArray: any[] = []
  constructor(private route: Router, private announcementService: AnnouncementService) { }

  ngOnInit(): void {
    console.log(this.route.url)
    this.announcementService.get(this.route.url).subscribe(
      res =>{
        this.announcementArray = res
        this.announcementArray.forEach(element =>{
          element.imagesBytes = mapImageList(element.imagesBytes)
        })
      }
    )
  }

}
