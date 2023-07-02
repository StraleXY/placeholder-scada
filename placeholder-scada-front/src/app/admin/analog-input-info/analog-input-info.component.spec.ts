import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalogInputInfoComponent } from './analog-input-info.component';

describe('AnalogInputInfoComponent', () => {
  let component: AnalogInputInfoComponent;
  let fixture: ComponentFixture<AnalogInputInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalogInputInfoComponent]
    });
    fixture = TestBed.createComponent(AnalogInputInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
