import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KonsolLoComponent } from './konsol-lo.component';

describe('KonsolLoComponent', () => {
  let component: KonsolLoComponent;
  let fixture: ComponentFixture<KonsolLoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KonsolLoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KonsolLoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
