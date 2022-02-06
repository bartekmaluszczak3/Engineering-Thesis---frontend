import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin/admin.service';
import { AnnouncementService } from '../services/announcement/announcement.service';
import { mapImageList } from '../shared/utils';

@Component({
  selector: 'app-admin-announcement',
  templateUrl: './admin-announcement.component.html',
  styleUrls: ['./admin-announcement.component.css']
})
export class AdminAnnouncementComponent implements OnInit {
  announcementArray: any[] = []
  constructor(private adminService: AdminService, private announcementService: AnnouncementService) { }

  ngOnInit(): void {
    this.adminService.get_announcement().subscribe(
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
    console.log(id)
    this.announcementService.delete(id).subscribe(res=>{
      console.log(res)
    })
  }
}
