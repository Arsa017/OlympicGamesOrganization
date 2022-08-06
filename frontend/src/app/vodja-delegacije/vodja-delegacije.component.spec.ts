import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VodjaDelegacijeComponent } from './vodja-delegacije.component';

describe('VodjaDelegacijeComponent', () => {
  let component: VodjaDelegacijeComponent;
  let fixture: ComponentFixture<VodjaDelegacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VodjaDelegacijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VodjaDelegacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
