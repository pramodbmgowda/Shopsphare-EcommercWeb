import { inject, Injectable } from '@angular/core';
import { Product } from './_model/product.model';
import { FileHandle } from './_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {


  private sanitizer: DomSanitizer = inject(DomSanitizer);
  constructor() { }


  public createImages(product:Product){
   const productImages:any[] = product.productImages;


   const productImagesToFileHandle: FileHandle[] =[];

   for(let i=0; i<productImages.length; i++){
    const imageFileData = productImages[i];

   const imageBlob =  this.dataURLtoBlob(imageFileData.picByte, imageFileData.type);

   const imageFile = new File([imageBlob] , imageFileData.name, { type: imageFileData.type});

   const finalFileHande: FileHandle={
    file: imageFile,
    url:this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
   };

   productImagesToFileHandle.push(finalFileHande);

   }

   product.productImages = productImagesToFileHandle;
   return product;

  }

  public dataURLtoBlob(picByte:any,imageType:any){
    const byteString = window.atob(picByte);

    const arrayBuffer = new ArrayBuffer(byteString.length);

    const int8Array = new Int8Array(arrayBuffer);

    for(let i=0; i<byteString.length;i++){
      int8Array[i]= byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array],{type:imageType});
    return blob;


  }
}
