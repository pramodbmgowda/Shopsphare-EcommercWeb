import { Component, inject } from '@angular/core';
import { FormsModule, Form, NgForm, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import {  ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-componenet',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,CommonModule,MatInputModule,MatIconModule,ReactiveFormsModule],
  templateUrl: './register-componenet.component.html',
  styleUrl: './register-componenet.component.css'
})
export class RegisterComponenetComponent {
  termsControl = new FormControl(false);
  isChecked =false;


private productService: ProductService = inject(ProductService);
private router :Router =inject(Router)

  

RegisterForm(registerForm: NgForm) {
  if (registerForm.invalid || !this.isChecked) {
    alert("Please fill all fields and accept the Terms & Conditions.");
    return;
  }

  console.log("Registering user:", registerForm.value);

  this.productService.register(registerForm.value).subscribe(
    (response) => {
      console.log("Registration Successful:", response);
      this.router.navigate(['/login']);
    },
    (error) => {
      console.error("Registration Failed:", error);
      alert("Registration failed. Please try again.");
    }
  );
}

   
terms(){
  this.router.navigate(['/terms'])
}
}


