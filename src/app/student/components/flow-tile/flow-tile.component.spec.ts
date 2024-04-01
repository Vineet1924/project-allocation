import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowTileComponent } from './flow-tile.component';

describe('FlowTileComponent', () => {
  let component: FlowTileComponent;
  let fixture: ComponentFixture<FlowTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlowTileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlowTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
