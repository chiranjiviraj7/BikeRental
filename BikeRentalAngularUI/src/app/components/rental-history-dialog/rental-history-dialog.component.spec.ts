import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalHistoryDialogComponent } from './rental-history-dialog.component';

describe('RentalHistoryDialogComponent', () => {
  let component: RentalHistoryDialogComponent;
  let fixture: ComponentFixture<RentalHistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentalHistoryDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentalHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
