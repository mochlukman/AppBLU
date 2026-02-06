import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BkuDanaBokComponent } from './bku-dana-bok.component';

describe('BkuDanaBokComponent', () => {
  let component: BkuDanaBokComponent;
  let fixture: ComponentFixture<BkuDanaBokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BkuDanaBokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BkuDanaBokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
