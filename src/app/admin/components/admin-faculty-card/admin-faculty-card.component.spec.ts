import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFacultyCardComponent } from './admin-faculty-card.component';

describe('AdminFacultyCardComponent', () => {
  let component: AdminFacultyCardComponent;
  let fixture: ComponentFixture<AdminFacultyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFacultyCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminFacultyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
