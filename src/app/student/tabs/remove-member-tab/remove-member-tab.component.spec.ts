import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveMemberTabComponent } from './remove-member-tab.component';

describe('RemoveMemberTabComponent', () => {
  let component: RemoveMemberTabComponent;
  let fixture: ComponentFixture<RemoveMemberTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemoveMemberTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemoveMemberTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
