import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { Product } from '../_model/product.model';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-add-new-product',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css'],
})
export class AddNewProductComponent {

isNewProduct =true;

  product: Product= {
    productId: 0,
    productName: '',
    productDescription: '',
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: [] ,
};

  constructor(
    private productService: ProductService,
    private sanitizer: DomSanitizer,private activatedRoot:ActivatedRoute
   
  ) {}

  private router: Router =inject(Router)

  ngOnInit(): void{
  this.product = this.activatedRoot.snapshot.data['productt'];

  if (this.product?.productId) {
    this.isNewProduct = false;
  }
  }

  get isValidForm(): boolean {
    return (
      this.product.productName.trim() !== '' &&
      this.product.productDescription.trim() !== '' &&
      this.product.productActualPrice > 0
    );
  }

  addProduct(form: NgForm) {
    const productFormData = this.prepareFormData(this.product);

    if (!this.isValidForm) {
      alert('Please fill  and ensure the correct data in all the required fields!');
      return;
    }

    this.productService.addProduct(productFormData).subscribe(
      (response: Product) => {
        console.log(response);

       


        // Reset product object
        this.product = {
          productId: 0,
          productName: '',
          productDescription: '',
          productDiscountedPrice: 0,
          productActualPrice: 0,
          productImages: [],
        };

        form.resetForm(); // Reset the form fields
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }
  prepareFormData(product: Product): FormData {
    const formData = new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );

    for (let i = 0; i < product.productImages.length; i++) {
      formData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      );
    }
    return formData;
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ),
      };

      this.product.productImages.push(fileHandle);
    }
  }

  removeImage(index: number) {
    this.product.productImages.splice(index, 1);
  }



  fileDropped(files: FileHandle[]) {
    if (files && Array.isArray(files)) {
      files.forEach(file => {
        file.url = this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file.file)
        );
      });
      this.product.productImages.push(...files);
    } else {
      console.error("Invalid file event:", files);
    }
  }
  

  updateToProduct(){
    this.router.navigate(['/showProductDetails'])

  }
  
 
  
  }



