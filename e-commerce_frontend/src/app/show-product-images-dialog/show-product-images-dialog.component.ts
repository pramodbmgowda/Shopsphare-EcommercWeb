import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-product-images-dialog',
  standalone: true,
  imports: [MatDialogModule, MatGridListModule, CommonModule],
  templateUrl:'./show-product-images-dialog.component.html',
  styleUrls: ['./show-product-images-dialog.component.css'] // ✅ Fixed typo
})
export class ShowProductImagesDialogComponent {
  data = inject(MAT_DIALOG_DATA) as { images: any[] }; 


  ngOnInit(): void {
    this.receiveImages();
  }

  receiveImages(): void {
    console.log(this.data.images);
  }
  getResponsiveColumns(): number {
     return window.innerWidth > 768 ? 3 : 2; // 3 columns for large screens, 2 for small screens
   }
}