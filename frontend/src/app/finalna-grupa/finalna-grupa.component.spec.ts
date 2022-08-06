import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalnaGrupaComponent } from './finalna-grupa.component';

describe('FinalnaGrupaComponent', () => {
  let component: FinalnaGrupaComponent;
  let fixture: ComponentFixture<FinalnaGrupaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalnaGrupaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalnaGrupaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
