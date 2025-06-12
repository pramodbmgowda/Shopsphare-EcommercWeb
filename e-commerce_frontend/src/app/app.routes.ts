import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { authGuard } from './_auth/auth.guard';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import { ProductResolverService } from './product-resolver.service';
import { ProductViewDetailsComponent } from './product-view-details/product-view-details.component';
import { BuyNewProductComponent } from './buy-new-product/buy-new-product.component';
import { BuyProductResolverService } from './buy-product-resolver.service';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { RegisterComponenetComponent } from './register-componenet/register-componenet.component';
import { CartComponent } from './cart/cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminShowOrdersComponent } from './admin-show-orders/admin-show-orders.component';

import { TermsComponent } from './terms/terms.component';


export const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'login', component: LoginComponent }, // Login page
  {
    path: 'user',
    component: UserComponent,
    canActivate: [authGuard],
    data: { roles: ['User'] },
  }, // user route
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
    data: { roles: ['Admin'] },
  }, // admin page
  { path: 'forbidden', component: ForbiddenComponent }, // forbidden page
  { path: 'addNewComponent', 
    component: AddNewProductComponent,
    canActivate:[authGuard],
    data:{roles:['Admin']},resolve:{ productt: ProductResolverService} },
     //add product page
     { path: 'showProductDetails', component: ShowProductDetailsComponent, canActivate:[authGuard],data:{roles:['Admin']}},
     { path: 'productViewDetails' , component: ProductViewDetailsComponent, resolve:{product: ProductResolverService}},
     { path: 'buyProduct' , component: BuyNewProductComponent ,canActivate:[authGuard],data:{roles:['User']}, resolve: {productt: BuyProductResolverService}},
     { path: 'orderConfirm' , component:OrderConfirmationComponent, canActivate:[authGuard],data:{roles:['User']}},
     {  path: 'register',component:RegisterComponenetComponent,},
     { path: 'cart' , component: CartComponent ,canActivate:[authGuard],data:{roles:['User']}},
     { path: 'loginit', component: LoginComponent },
     { path: 'myOrder' , component: MyOrdersComponent,canActivate:[authGuard],data:{roles:['User']}},
     { path: 'adminShowOrder' , component: AdminShowOrdersComponent,canActivate:[authGuard],data:{roles:['Admin']}},

     {  path: 'terms',component:TermsComponent},
   

     
];
