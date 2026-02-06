import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KonsolNeracaComponent } from './konsol-neraca.component';

describe('KonsolNeracaComponent', () => {
  let component: KonsolNeracaComponent;
  let fixture: ComponentFixture<KonsolNeracaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KonsolNeracaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KonsolNeracaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
