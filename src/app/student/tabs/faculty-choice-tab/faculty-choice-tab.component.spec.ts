import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyChoiceTabComponent } from './faculty-choice-tab.component';

describe('FacultyChoiceTabComponent', () => {
  let component: FacultyChoiceTabComponent;
  let fixture: ComponentFixture<FacultyChoiceTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacultyChoiceTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacultyChoiceTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
