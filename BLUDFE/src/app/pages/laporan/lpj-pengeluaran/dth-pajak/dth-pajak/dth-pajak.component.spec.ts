import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DthPajakComponent } from './dth-pajak.component';

describe('DthPajakComponent', () => {
  let component: DthPajakComponent;
  let fixture: ComponentFixture<DthPajakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DthPajakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DthPajakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
