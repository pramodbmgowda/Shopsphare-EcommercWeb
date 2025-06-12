import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowOrdersComponent } from './admin-show-orders.component';

describe('AdminShowOrdersComponent', () => {
  let component: AdminShowOrdersComponent;
  let fixture: ComponentFixture<AdminShowOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminShowOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminShowOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
