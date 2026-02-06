import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpjTerimaSetorComponent } from './lpj-terima-setor.component';

describe('LpjTerimaSetorComponent', () => {
  let component: LpjTerimaSetorComponent;
  let fixture: ComponentFixture<LpjTerimaSetorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpjTerimaSetorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpjTerimaSetorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
