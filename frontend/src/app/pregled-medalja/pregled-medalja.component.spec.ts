import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledMedaljaComponent } from './pregled-medalja.component';

describe('PregledMedaljaComponent', () => {
  let component: PregledMedaljaComponent;
  let fixture: ComponentFixture<PregledMedaljaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledMedaljaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledMedaljaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
