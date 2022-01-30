import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../services/image/image.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {

  constructor(private imageService: ImageService, private route: ActivatedRoute, private router: Router) { }
  id: any
  selectedFile!: File
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string | undefined;
  imageName: any;
  imageArray: any[] = [];
  arrayToSend: any[] = [];
  reader = new FileReader()

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
  
  }


  public onFileChanged(event: any){
    this.selectedFile = event.target.files[0]
  }

  public upload(){
    this.arrayToSend.push(this.selectedFile)
    this.reader.readAsDataURL(this.selectedFile)
    this.reader.onload = (e) =>{
      this.imageArray.push(this.reader.result)
    }
  }
  convert(file: any){
      this.reader.readAsDataURL(file)
      this.reader.onload = (e) =>{
        return this.reader.result
      }
  }
  public send(){
    this.imageService.upload(this.arrayToSend, this.id)    
    let url = "/announcement/" + this.id
          this.router.navigate([url])
  }

  public delete(element: any){
    console.log(element)
    this.imageArray = this.imageArray.filter((el:any) => el!== element)
    this.arrayToSend = this.arrayToSend.filter((el:any) => el! == element)
  }
}
