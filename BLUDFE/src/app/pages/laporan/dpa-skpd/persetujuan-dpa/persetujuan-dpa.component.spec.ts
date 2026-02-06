import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersetujuanDpaComponent } from './persetujuan-dpa.component';

describe('PersetujuanDpaComponent', () => {
  let component: PersetujuanDpaComponent;
  let fixture: ComponentFixture<PersetujuanDpaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersetujuanDpaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersetujuanDpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
