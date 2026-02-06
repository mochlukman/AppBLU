import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KasBludComponent } from './kas-blud.component';

describe('KasBludComponent', () => {
  let component: KasBludComponent;
  let fixture: ComponentFixture<KasBludComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KasBludComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KasBludComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
