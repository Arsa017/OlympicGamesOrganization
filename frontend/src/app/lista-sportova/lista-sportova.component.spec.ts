import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSportovaComponent } from './lista-sportova.component';

describe('ListaSportovaComponent', () => {
  let component: ListaSportovaComponent;
  let fixture: ComponentFixture<ListaSportovaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaSportovaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSportovaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
