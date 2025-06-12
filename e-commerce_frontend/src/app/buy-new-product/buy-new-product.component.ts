import { Component, inject, Injector, NgZone } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { orderDetails } from '../_model/orderDetails.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-buy-new-product',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatGridListModule, CommonModule, FormsModule],
  templateUrl: './buy-new-product.component.html',
  styleUrls: ['./buy-new-product.component.css']
})
export class BuyNewProductComponent {
  productDetails: Product[] = [];
  private productService: ProductService = inject(ProductService);
  private router: Router = inject(Router);
  private activatedroute: ActivatedRoute = inject(ActivatedRoute);
  isSingleProductCheckOut: any = '';
  private injector:Injector =inject(Injector)

  OrderDetails: orderDetails = {
    fullName: '',
    fullAdrress: '',
    contactNumber: '',
    alternatNumber: '', 
    transactionId: '',
    orderProductQuantityList: []
  };

  ngOnInit(): void {
    this.productDetails = this.activatedroute.snapshot.data['productt'];
    this.isSingleProductCheckOut = this.activatedroute.snapshot.paramMap.get("isSingleProductCheckOut") ?? '';

    if (this.productDetails && this.productDetails.length > 0) {
      this.productDetails.forEach(
        (x) => this.OrderDetails.orderProductQuantityList.push(
          { productId: x.productId, quantity: 1 }
        )
      );
    }

    console.log(this.OrderDetails);
    console.log(this.productDetails);
  }

  public placeOrder(orderForm: NgForm) {
    this.productService.placeOrder(this.OrderDetails, this.isSingleProductCheckOut).subscribe(
      (response) => {
        console.log('Order Placed:', response);
        orderForm.resetForm();
       const ngZone = this.injector.get(NgZone)
       ngZone.run(
        ()=>{
          this.router.navigate(['/orderConfirm']);

        }
       );
        
      },
      (error) => {
        console.error('Order Error:', error);
      }
    );
  }

  getQuantityForProduct(productId: any) {
    const filterProduct = this.OrderDetails.orderProductQuantityList
      .filter((productQuantity) => productQuantity.productId === productId);
    return filterProduct.length > 0 ? filterProduct[0].quantity : 0;
  }

  getCalculatedTotal(productId: any, productDiscountedPrice: any) {
    const filterProduct = this.OrderDetails.orderProductQuantityList
      .find((productQuantity) => productQuantity.productId === productId);
    return filterProduct ? filterProduct.quantity * productDiscountedPrice : 0;
  }

  onQuantityChange(Quantity: any, productId: any) {
    const product = this.OrderDetails.orderProductQuantityList
      .find((orderProduct) => orderProduct.productId === productId);
    if (product) product.quantity = Quantity;
  }

  getCalculatedGrandTotal() {
    return this.OrderDetails.orderProductQuantityList.reduce((grandTotal, productQuantity) => {
      const product = this.productDetails.find(product => product.productId === productQuantity.productId);
      return product ? grandTotal + (product.productDiscountedPrice * productQuantity.quantity) : grandTotal;
    }, 0);
  }

  createTransactionAndPlaceOrder(orderForm: NgForm) {
    let amount = this.getCalculatedGrandTotal();
    this.productService.createTransaction(amount).subscribe(
      (response) => {
        console.log('Transaction Response:', response);
        this.openTransactionModule(response, orderForm);
      },
      (error) => {
        console.error('Transaction Error:', error);
      }
    );
  }

  openTransactionModule(response: any, orderForm: NgForm) {
    const options = {
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      order_id: response.orderId, // Razorpay expects this key name
      name: 'PramodBMGowdru',
      description: 'Payment for online shopping',
      image: 'https://cdn.pixabay.com/photo/2023/10/27/10/28/woman-8344944_1280.jpg',
      handler: (paymentResponse: any) => {
        if (paymentResponse?.razorpay_payment_id) {
          this.processResponse(paymentResponse, orderForm);
        } else {
          alert("Payment failed. Please try again.");
        }
      },
      prefill: {
        name: 'Rwiz',
        email: 'monkey@gmail.com',
        contact: '7411470477'
      },
      notes: {
        address: 'Online shopping'
      },
      theme: {
        color: '#007bff'
      }
    };

    const razorPay = new (window as any).Razorpay(options);
    razorPay.open();

    // Handle payment failures
    razorPay.on('payment.failed', (response: any) => {
      console.error('Payment Failed:', response.error);
      alert("Payment failed. Reason: " + response.error.description);
    });
  }

  processResponse(paymentResponse: any, orderForm: NgForm) {
    console.log('Payment Successful:', paymentResponse);
    this.OrderDetails.transactionId = paymentResponse.razorpay_payment_id;
    this.placeOrder(orderForm);
  }
}