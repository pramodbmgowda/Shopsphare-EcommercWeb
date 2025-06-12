import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { ProductService } from '../_services/product.service';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../_model/product.model';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,MatTableModule,MatButtonModule,MatIconModule, ShowProductImagesDialogComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})



export class CartComponent {

  

  cartDetails: any [] =[];

  ngOnInit(): void{
    this.getCartDetails()


  }
  

private router :Router = inject(Router)
  private productService: ProductService =inject(ProductService);
  displayedColumns: string[] = ['Name', 'Description', 'ActualPrice', 'Discountedprice','delete'];

  getCartDetails(){
    this.productService.getCartDetails().subscribe(
      (response)=>{
        console.log(response);
        this.cartDetails = response;
        

      },
      (error)=>
      {
        console.log(error);
      }
    )
  }
  


  checkOut()
{

  // this.productService.getProductDetails(false,0).subscribe(
  //   (response)=>{
  //     console.log(response)
  //   },
  //   (error)=>
  //   {
  //     console.log(error);
  //   }
  // )

  this.router.navigate(['/buyProduct',{
    isSingleProductCheckOut: false, id: 0
  }]);

}

deleteProduct(cartId:any){
 this.productService.deleteCartItem(cartId).subscribe(
  (response) =>{
    console.log(response);
    this.getCartDetails();

  },(error) =>{
    console.log(error)
  }
 )

}
}
