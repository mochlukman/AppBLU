import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BppajakDanaBokComponent } from './bppajak-dana-bok.component';

describe('BppajakDanaBokComponent', () => {
  let component: BppajakDanaBokComponent;
  let fixture: ComponentFixture<BppajakDanaBokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BppajakDanaBokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BppajakDanaBokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
