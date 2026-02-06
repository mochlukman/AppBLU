import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DokPanjarComponent } from './dok-panjar.component';

describe('DokPanjarComponent', () => {
  let component: DokPanjarComponent;
  let fixture: ComponentFixture<DokPanjarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DokPanjarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DokPanjarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
