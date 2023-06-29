import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOutputsComponent } from './admin-outputs.component';

describe('AdminOutputsComponent', () => {
  let component: AdminOutputsComponent;
  let fixture: ComponentFixture<AdminOutputsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOutputsComponent]
    });
    fixture = TestBed.createComponent(AdminOutputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
