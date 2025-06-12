import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from './_model/product.model';
import { map, Observable, of } from 'rxjs';
import { ProductService } from './_services/product.service';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product> { 
  constructor(private productService: ProductService) {}

  public imageprocessing: ImageProcessingService = inject(ImageProcessingService);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const id: any = route.paramMap.get("productId");

    if (id) {
      return this.productService.getProductDetailsById(id).pipe(
        map(product => this.imageprocessing.createImages(product))
      );
    } else {
      return of(this.getProductDetails()); 
    }
  }

  getProductDetails(): Product {
    return {
      productId: 0,
      productName: '',
      productDescription: '',
      productDiscountedPrice: 0,
      productActualPrice: 0,
      productImages: [],
    };
  }
}