import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { map } from 'rxjs';
import { ImageProcessingService } from '../image-processing.service';
import { HttpErrorResponse } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card'
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,MatGridListModule,MatCardModule,MatInputModule,MatIconModule],
  templateUrl:'./home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {

isShowMoreButton = false;
  pageNumber:number = 0;
  productDetails: Product[] = [];


  private productService: ProductService = inject(ProductService);
  private imageProcessingService: ImageProcessingService = inject(ImageProcessingService);

  private router:Router = inject(Router);


  ngOnInit(): void{
    this.getAllProducts();

  }

  // public getAllProducts(){
  //    this.productService.getAllProducts(this.pageNumber)
  //    .pipe(
  //      map((x: Product[], i) => x.map((product: Product)=> this.imageProcessingService.createImages(product)))
 
  //    )
  //    .subscribe(
  //      (response: Product[])=>{
  //        console.log(response)
  //        if(response.length == 2){
  //         this.isShowMoreButton =true;

  //        }else{
  //         this.isShowMoreButton = false;
  //        }
  //        response.forEach(p => this.productDetails.push(p));
  //       //  this.productDetails=response;
  //      },
  //      (error: HttpErrorResponse) =>{
  //        console.log(error);
  //      }
  //      );
  //  }
  public getAllProducts(searchKey:string = "") {
    this.productService.getAllProducts(this.pageNumber,searchKey)
      .pipe(
        map((products: Product[]) => 
          products.map((product: Product) => this.imageProcessingService.createImages(product))
        )
      )
      .subscribe(
        (response: Product[]) => {
          console.log(response);
          
  
          // Create a Set of existing product IDs
          const existingProductIds = new Set(this.productDetails.map(p => p.productId));
  
          // Filter out products that are already present
          const newProducts = response.filter(p => !existingProductIds.has(p.productId));
  
          // Show "Show More" button only if there are new products
          this.isShowMoreButton = newProducts.length > 0;
  
          if (newProducts.length > 0) {
            this.productDetails = [...this.productDetails, ...newProducts];
            this.pageNumber++;
           } // ✅ Increment page for next fetch
          //   this.isShowMoreButton = true;
          // } else {
          //   this.isShowMoreButton = false;
          // }
          if(response.length == 12){
            this.isShowMoreButton =true;
  
                   }else{
                   this.isShowMoreButton = false;
                    }
        },
        (error: HttpErrorResponse) => {
          console.error("Error fetching products:", error);
        }
      );
  }
   showProductDetails(productId:any){

this.router.navigate(['/productViewDetails',{productId: productId}])

   }

   searchByKeyword(searchKeyword:any ){
    console.log(searchKeyword);
    this.pageNumber =0;
    this.productDetails = [];
    this.getAllProducts(searchKeyword)

   }


   onClick() {
    this.searchByKeyword('phone')
  }

  
  filterByLaptops() {
    this.searchByKeyword('laptop')
  }
  filterByAirpods(){
    this.searchByKeyword('airpods')

   
}
}


