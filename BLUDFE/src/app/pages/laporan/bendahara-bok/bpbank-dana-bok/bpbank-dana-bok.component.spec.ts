import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpbankDanaBokComponent } from './bpbank-dana-bok.component';

describe('BpbankDanaBokComponent', () => {
  let component: BpbankDanaBokComponent;
  let fixture: ComponentFixture<BpbankDanaBokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpbankDanaBokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpbankDanaBokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
