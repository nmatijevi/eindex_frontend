import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KolegijComponent } from './kolegij.component';

describe('KolegijComponent', () => {
  let component: KolegijComponent;
  let fixture: ComponentFixture<KolegijComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KolegijComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KolegijComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
