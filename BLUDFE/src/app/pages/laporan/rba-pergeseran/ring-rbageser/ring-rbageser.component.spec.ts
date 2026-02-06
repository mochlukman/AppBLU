import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RingRbageserComponent } from './ring-rbageser.component';

describe('RingRbageserComponent', () => {
  let component: RingRbageserComponent;
  let fixture: ComponentFixture<RingRbageserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RingRbageserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RingRbageserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
