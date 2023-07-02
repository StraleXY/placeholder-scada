import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalInputInfoComponent } from './digital-input-info.component';

describe('DigitalInputInfoComponent', () => {
  let component: DigitalInputInfoComponent;
  let fixture: ComponentFixture<DigitalInputInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DigitalInputInfoComponent]
    });
    fixture = TestBed.createComponent(DigitalInputInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
