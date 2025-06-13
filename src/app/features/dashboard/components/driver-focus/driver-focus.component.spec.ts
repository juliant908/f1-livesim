import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverFocusComponent } from './driver-focus.component';

describe('DriverFocusComponent', () => {
  let component: DriverFocusComponent;
  let fixture: ComponentFixture<DriverFocusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverFocusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
