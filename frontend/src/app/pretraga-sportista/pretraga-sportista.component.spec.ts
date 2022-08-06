import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PretragaSportistaComponent } from './pretraga-sportista.component';

describe('PretragaSportistaComponent', () => {
  let component: PretragaSportistaComponent;
  let fixture: ComponentFixture<PretragaSportistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PretragaSportistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PretragaSportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
