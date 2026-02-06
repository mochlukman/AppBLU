import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpkasDanaBokComponent } from './bpkas-dana-bok.component';

describe('BpkasDanaBokComponent', () => {
  let component: BpkasDanaBokComponent;
  let fixture: ComponentFixture<BpkasDanaBokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpkasDanaBokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpkasDanaBokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
