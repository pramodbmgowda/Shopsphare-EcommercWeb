import { Component, inject } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product-view-details',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,MatGridListModule,CommonModule,MatSidenavModule],
  templateUrl: './product-view-details.component.html',
  styleUrl: './product-view-details.component.css'
})
export class ProductViewDetailsComponent {
  selectedProductIndex = 0;

  private activatedRoot: ActivatedRoute = inject(ActivatedRoute)
  private router: Router = inject(Router);
  private productService: ProductService =inject(ProductService);

  product: Product | any;
  

  ngOnInit(): void{
    this.product = this.activatedRoot.snapshot.data['product'];
    console.log(this.product);

   
}
changeIndex(index:any){
  this.selectedProductIndex =index ;
}


buyProduct(productId: any){
  this.router.navigate(['/buyProduct',{
    isSingleProductCheckOut: true, id: productId
  }]);
}

addToCart(productId: any){
  console.log(productId)
  this.productService.addToCart(productId).subscribe(
    (response)=>{
      console.log(response);
    },
    (error)=>{
      console.log(error);
    }
  )


}

}
