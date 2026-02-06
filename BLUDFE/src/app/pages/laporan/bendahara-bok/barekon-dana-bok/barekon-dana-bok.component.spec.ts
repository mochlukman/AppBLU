import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarekonDanaBokComponent } from './barekon-dana-bok.component';

describe('BarekonDanaBokComponent', () => {
  let component: BarekonDanaBokComponent;
  let fixture: ComponentFixture<BarekonDanaBokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarekonDanaBokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarekonDanaBokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
