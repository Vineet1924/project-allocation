import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminResultPopupComponent } from './admin-result-popup.component';

describe('AdminResultPopupComponent', () => {
  let component: AdminResultPopupComponent;
  let fixture: ComponentFixture<AdminResultPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminResultPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminResultPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
