import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalogInputComponent } from './analog-input.component';

describe('AnalogInputComponent', () => {
  let component: AnalogInputComponent;
  let fixture: ComponentFixture<AnalogInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalogInputComponent]
    });
    fixture = TestBed.createComponent(AnalogInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
