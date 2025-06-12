import { Component, inject } from '@angular/core';
import { ProductService } from '../_services/product.service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common'; 
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
@Component({
  selector: 'app-admin-show-orders',
  standalone: true,
  imports: [MatTableModule,MatButtonModule,CommonModule,MatButtonToggleModule ,MatChipsModule,MatIconModule,ShowProductImagesDialogComponent ],
  templateUrl: './admin-show-orders.component.html',
  styleUrl: './admin-show-orders.component.css'
})
export class AdminShowOrdersComponent {
  private productService :ProductService = inject(ProductService)
  getOrderDetail:any = [];
  displayedColumns: string[] = ['Name', 'Address', 'ContactNo', 'Amount','Status','Action'];

  status :any = 'Placed';
  


  
  ngOnInit(): void{
   
    this.getAllOrderDetails(this.status);
  
  }

  public getAllOrderDetails(statusParameter:any){
    this.productService.getAllOrderDetails(statusParameter).subscribe(
      (response)=>{
        console.log(response)
        this.getOrderDetail = response;
      },
      (error)=>{
      console.log(error)
      }
    );

  }


  markAsDelivered(element:any){
    console.log(element)
    this.productService.MarkAsDelivererd(element).subscribe(
      (response)=>{
        console.log(response);
        this.getAllOrderDetails(this.status);
      }
    )

  }
}
