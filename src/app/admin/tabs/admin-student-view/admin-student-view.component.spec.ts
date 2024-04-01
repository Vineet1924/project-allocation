import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentViewComponent } from './admin-student-view.component';

describe('AdminStudentViewComponent', () => {
  let component: AdminStudentViewComponent;
  let fixture: ComponentFixture<AdminStudentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminStudentViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminStudentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
