import { Component, inject } from '@angular/core';
import { ProductService } from '../_services/product.service';
import {MatTableModule} from '@angular/material/table';
import { orderDetails } from '../_model/orderDetails.model';
import { FormsModule, Form, NgForm, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [MatTableModule,FormsModule,CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  private productService:ProductService =inject(ProductService)

  displayedColumns: string[] = ['Name', 'Address', 'Contact No', 'Amount','Status'];
  getOrderDetail :any =[];



  ngOnInit(): void{
    this.getOrderDetails();
  }


  public getOrderDetails(){
    this.productService.getOrderDetails().subscribe(
      (response)=>{
        console.log(response)
        this.getOrderDetail = response;
      },
      (error)=>{
      console.log(error)
      }
    );

  }

}
