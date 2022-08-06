import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledZemaljaComponent } from './pregled-zemalja.component';

describe('PregledZemaljaComponent', () => {
  let component: PregledZemaljaComponent;
  let fixture: ComponentFixture<PregledZemaljaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledZemaljaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledZemaljaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
