import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalInputComponent } from './digital-input.component';

describe('DigitalInputComponent', () => {
  let component: DigitalInputComponent;
  let fixture: ComponentFixture<DigitalInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DigitalInputComponent]
    });
    fixture = TestBed.createComponent(DigitalInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
