import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeRentComponent } from './bike-rent.component';

describe('BikeRentComponent', () => {
  let component: BikeRentComponent;
  let fixture: ComponentFixture<BikeRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BikeRentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BikeRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
