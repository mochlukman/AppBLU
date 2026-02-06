import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngkasPerubahanBelanjaComponent } from './angkas-perubahan-belanja.component';

describe('AngkasPerubahanBelanjaComponent', () => {
  let component: AngkasPerubahanBelanjaComponent;
  let fixture: ComponentFixture<AngkasPerubahanBelanjaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngkasPerubahanBelanjaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngkasPerubahanBelanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
