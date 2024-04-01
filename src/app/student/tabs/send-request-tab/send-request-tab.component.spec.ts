import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendRequestTabComponent } from './send-request-tab.component';

describe('SendRequestTabComponent', () => {
  let component: SendRequestTabComponent;
  let fixture: ComponentFixture<SendRequestTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendRequestTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SendRequestTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
