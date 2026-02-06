import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RekRbaComponent } from './rek-rba.component';

describe('RekRbaComponent', () => {
  let component: RekRbaComponent;
  let fixture: ComponentFixture<RekRbaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RekRbaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RekRbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
