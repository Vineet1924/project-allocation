import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomProjectModalComponent } from './custom-project-modal.component';

describe('CustomProjectModalComponent', () => {
  let component: CustomProjectModalComponent;
  let fixture: ComponentFixture<CustomProjectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomProjectModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomProjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
