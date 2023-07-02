import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalOutputInfoComponent } from './digital-output-info.component';

describe('DigitalOutputInfoComponent', () => {
  let component: DigitalOutputInfoComponent;
  let fixture: ComponentFixture<DigitalOutputInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DigitalOutputInfoComponent]
    });
    fixture = TestBed.createComponent(DigitalOutputInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
