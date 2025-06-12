import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { Form } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { orderDetails } from '../_model/orderDetails.model';
import { MyOrderDetails } from '../_model/ordered.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}



  public register(registerData:any){
    return this.httpClient.post('http://localhost:9090/registerNewUser',registerData);

  }

  public addProduct(product: FormData) {
    return this.httpClient.post<Product>(
      'http://localhost:9090/addNewProduct',
      product
    );
  }
  

  public getAllProducts(pageNumber:number,searchKeyword:string = ""){
    return this.httpClient.get<Product[]>('http://localhost:9090/getAllProducts?pageNumber=' + pageNumber + "&searchKey="+searchKeyword);
  }
  
  public getProductDetailsById(productId: number){
    return this.httpClient.get<Product>('http://localhost:9090/getProductDetailsById/' + productId);
  }
  

public deleteProduct(productId: number){
 return  this.httpClient.delete('http://localhost:9090/deleteProductDetails/' + productId);
}

public getProductDetails(isSingleProductCheckOut: any ,productId: any): Observable<Product[]>{
  return this.httpClient.get<Product[]>('http://localhost:9090/getProductDetails/' + isSingleProductCheckOut  + '/' + productId );

}

public placeOrder(orderDetails: orderDetails, isCartCheckOut: any) {
  console.log('Order Details:', orderDetails);
  console.log('isCartCheckOut:', isCartCheckOut);
  return this.httpClient.post(`http://localhost:9090/placeOrder/${isCartCheckOut}`, orderDetails);
}

public addToCart(productId: number){
  return this.httpClient.get('http://localhost:9090/addToCart/' + productId );
}


public getCartDetails(){
  return this.httpClient.get<Product[]>('http://localhost:9090/getCartDetails');
}


public deleteCartItem(cartId:any){
  return this.httpClient.delete('http://localhost:9090/deleteCartItem/' + cartId);
}



public getOrderDetails(): Observable<MyOrderDetails[]>{
  return this.httpClient.get<MyOrderDetails[]>('http://localhost:9090/getOrderDetail');
}

public getAllOrderDetails(status:any): Observable<MyOrderDetails[]>{
  return this.httpClient.get<MyOrderDetails[]>('http://localhost:9090/getAllOrderDetail/'+status);
}


public MarkAsDelivererd(orderId:any){
  return this.httpClient.get('http://localhost:9090/markOrderAsDelivered/'+orderId);
}


public createTransaction(amount:any){
  return this.httpClient.get("http://localhost:9090/createTransition/" + amount)
}
}
