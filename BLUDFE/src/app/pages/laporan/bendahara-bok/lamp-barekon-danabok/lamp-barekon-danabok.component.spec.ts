import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LampBarekonDanabokComponent } from './lamp-barekon-danabok.component';

describe('LampBarekonDanabokComponent', () => {
  let component: LampBarekonDanabokComponent;
  let fixture: ComponentFixture<LampBarekonDanabokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LampBarekonDanabokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LampBarekonDanabokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
