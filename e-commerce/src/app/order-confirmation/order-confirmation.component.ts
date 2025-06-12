import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css'
})
export class OrderConfirmationComponent {

   
   productDetails: Product[] =[];
    private productService:ProductService = inject(ProductService);
    private router:Router =inject(Router);
  
    private activatedroute: ActivatedRoute =inject(ActivatedRoute);
  
    
     
    ngOnInit(): void{
      this.productDetails = this.activatedroute.snapshot.data['productt'] ;
   
  }
  
}
