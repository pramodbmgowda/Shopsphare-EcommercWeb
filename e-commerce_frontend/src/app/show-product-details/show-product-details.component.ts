import { Component, inject } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../_model/product.model';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-show-product-details',
  standalone: true,
  imports: [MatTableModule,MatIconModule,MatButtonModule,MatDialogModule,CommonModule,MatInputModule],
  templateUrl: './show-product-details.component.html',
  styleUrl: './show-product-details.component.css'
})
export class ShowProductDetailsComponent {

  pageNumber:number =0;
productDetails: Product[] =[];
isShow=false;
showTable=false;

  displayedColumns: string[] = ['Product Id' , 'Product Name ', 'Product Description', 'ProductDiscounted Price','ProductActual Price','image','edit','delete'];

  dialog = inject(MatDialog);
  constructor(private productService: ProductService , public imagesDialog: MatDialogModule , private imageProcessingService:ImageProcessingService,private router:Router){}

  ngOnInit(): void {
    this.getAllProducts();
  }



  public getAllProducts(searchKey:string =""){
    this.showTable =false;
    this.productService.getAllProducts(this.pageNumber,searchKey)
    .pipe(
      map((x: Product[], i) => x.map((product: Product)=> this.imageProcessingService.createImages(product)))

    )
    .subscribe(
      (response: Product[])=>{

        
     
        response.forEach(pr => this.productDetails.push(pr));
        this.showTable=true;
        console.log(response)
        // this.productDetails=response;
        if(response.length == 12){
          this.isShow =true;
        }else{
          this.isShow=false;
        }
      },
      (error: HttpErrorResponse) =>{
        console.log(error);
      }
      );
  }

  deleteProduct(productId: number)
{
  this.productService.deleteProduct(productId).subscribe(
    (response)=>{
      
      this.getAllProducts();
      console.log(response)
    },
    (error:HttpErrorResponse)=>
      console.log(error)

  );

  
}
showImages(product:Product){
  console.log(product);
  this.dialog.open(ShowProductImagesDialogComponent,{
    data:{
      images:product.productImages
    },
    height: '500px',
    width:'800px'
  });
}

editProductDetails(productId:any){
  this.router.navigate(['/addNewComponent',{productId: productId}]);


}
public showMore(){
  this.pageNumber = this.pageNumber + 1;
  this.getAllProducts();



}

searchByKeyword(searchKeyword:any)
{
  console.log(searchKeyword);
  this.productDetails =[];
  this.pageNumber = 0;
  this.getAllProducts(searchKeyword);

}
}
