import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDasboardTabComponent } from './admin-dasboard-tab.component';

describe('AdminDasboardTabComponent', () => {
  let component: AdminDasboardTabComponent;
  let fixture: ComponentFixture<AdminDasboardTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDasboardTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDasboardTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
