import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyPopupComponent } from './faculty-popup.component';

describe('FacultyPopupComponent', () => {
  let component: FacultyPopupComponent;
  let fixture: ComponentFixture<FacultyPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacultyPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacultyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
