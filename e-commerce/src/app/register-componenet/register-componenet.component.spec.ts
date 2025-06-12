import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponenetComponent } from './register-componenet.component';

describe('RegisterComponenetComponent', () => {
  let component: RegisterComponenetComponent;
  let fixture: ComponentFixture<RegisterComponenetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponenetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterComponenetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
