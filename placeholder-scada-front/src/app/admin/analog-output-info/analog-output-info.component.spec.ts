import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalogOutputInfoComponent } from './analog-output-info.component';

describe('AnalogOutputInfoComponent', () => {
  let component: AnalogOutputInfoComponent;
  let fixture: ComponentFixture<AnalogOutputInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalogOutputInfoComponent]
    });
    fixture = TestBed.createComponent(AnalogOutputInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
