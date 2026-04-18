import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAlertDialogComponent } from './general-alert-dialog.component';

describe('GeneralAlertDialogComponent', () => {
  let component: GeneralAlertDialogComponent;
  let fixture: ComponentFixture<GeneralAlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralAlertDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
