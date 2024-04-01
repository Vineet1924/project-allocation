import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinGroupTabComponent } from './join-group-tab.component';

describe('JoinGroupTabComponent', () => {
  let component: JoinGroupTabComponent;
  let fixture: ComponentFixture<JoinGroupTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JoinGroupTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoinGroupTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
