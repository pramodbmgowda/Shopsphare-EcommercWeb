import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyNewProductComponent } from './buy-new-product.component';

describe('BuyNewProductComponent', () => {
  let component: BuyNewProductComponent;
  let fixture: ComponentFixture<BuyNewProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyNewProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyNewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
