import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from './_model/product.model';
import { ProductService } from './_services/product.service';
import { map, Observable, pipe } from 'rxjs';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]> {

  constructor( private productService: ProductService) { }
  public imageprocessing: ImageProcessingService = inject(ImageProcessingService);
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]>{

    const  id =route.paramMap.get("id");
    const isSingleProductCheckOut =route.paramMap.get("isSingleProductCheckOut");

   return this.productService.getProductDetails(isSingleProductCheckOut,id)
.pipe(
    map(
      (x: Product[], i) => x.map((product: Product) => this.imageprocessing.createImages(product))
        )
   );
  
  }
}
