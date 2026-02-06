import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtangRekananComponent } from './utang-rekanan.component';

describe('UtangRekananComponent', () => {
  let component: UtangRekananComponent;
  let fixture: ComponentFixture<UtangRekananComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtangRekananComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtangRekananComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
