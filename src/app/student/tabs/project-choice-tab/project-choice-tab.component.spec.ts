import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectChoiceTabComponent } from './project-choice-tab.component';

describe('ProjectChoiceTabComponent', () => {
  let component: ProjectChoiceTabComponent;
  let fixture: ComponentFixture<ProjectChoiceTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectChoiceTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectChoiceTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
