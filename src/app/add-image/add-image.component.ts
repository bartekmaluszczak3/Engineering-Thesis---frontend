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
  map = new Map<String, any>();
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
      this.map.set(this.selectedFile.name, this.reader.result)
    }
    console.log(this.arrayToSend)
    this.map.forEach((value: any, key: any) => {
      console.log(key);
  });  
}

  public send(){
    this.imageService.upload(this.arrayToSend, this.id)    
    let url = "/announcement/" + this.id
          this.router.navigate([url])
  }

  public delete(element: any){
    this.map.delete(element)
    this.arrayToSend = this.arrayToSend.filter((el:any) => el.name! == element)
    console.log(this.arrayToSend)
    this.map.forEach((value: any, key: any) => {
      console.log(key);
  });
  }
}
