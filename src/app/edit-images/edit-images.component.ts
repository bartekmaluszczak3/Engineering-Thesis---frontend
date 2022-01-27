import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../services/image/image.service';

@Component({
  selector: 'app-edit-images',
  templateUrl: './edit-images.component.html',
  styleUrls: ['./edit-images.component.css']
})
export class EditImagesComponent implements OnInit {

  constructor(private imageService: ImageService, private route: ActivatedRoute, private router: Router) { }
  id = this.route.snapshot.paramMap.get('id')
  selectedFile!: File
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string | undefined;
  imageName: any;
  imageArray: any [] = []; 
  arrayToSend: any[] = [];
  reader = new FileReader()

  ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id')
        this.imageService.get(this.id).subscribe(res=>{
          this.imageArray = res
          this.imageArray.forEach(e=>{
            e.bytes = "data:image/JPEG;base64," + e.bytes
          })
        })
       
  }


  public onFileChanged(event: any){
    console.log(this.imageArray)
    this.selectedFile = event.target.files[0]
  }

  public upload(){
    this.arrayToSend.push(this.selectedFile)
    this.reader.readAsDataURL(this.selectedFile)
    this.reader.onload = (e) =>{
      this.imageArray.push(this.reader.result)
    }
  }
  public send(){
    this.imageService.upload(this.arrayToSend, this.id)    
    let url = "/announcement/" + this.id
          this.router.navigate([url])
  }


  public get(){
    this.imageService.get(this.id).subscribe(
      res=>{
        this.retrieveResonse = res;
        console.log(res)
        this.base64Data = this.retrieveResonse.bytes;
        this.retrievedImage = 'data:image/JPEG;base64,' + this.base64Data;
      }
    )
  }

  public delete(element: any){
    console.log(element)
    this.imageArray = this.imageArray.filter((el:any) => el!== element)
    this.imageService.delete(element.id).subscribe()
  }
}

