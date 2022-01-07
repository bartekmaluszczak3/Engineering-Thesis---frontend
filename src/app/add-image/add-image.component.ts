import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../services/image/image.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {

  constructor(private imageService: ImageService, private route: ActivatedRoute) { }
  id: any
  selectedFile!: File
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string | undefined;
  imageName: any;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
  }


  public onFileChanged(event: any){
    this.selectedFile = event.target.files[0]
  }

  public upload(){
    console.log(this.selectedFile)
    this.imageService.upload(this.selectedFile, 1).subscribe((res) =>{
        console.log(res)
        this.message = "Uploaded";
      }
    )
  }

  public get(){
    this.imageService.get(1).subscribe(
      res=>{
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.bytes;
        this.retrievedImage = 'data:image/JPEG;base64,' + this.base64Data;
      }
    )
  }
}
