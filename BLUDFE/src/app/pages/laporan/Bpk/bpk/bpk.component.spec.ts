import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpkComponent } from './bpk.component';

describe('BpkComponent', () => {
  let component: BpkComponent;
  let fixture: ComponentFixture<BpkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
