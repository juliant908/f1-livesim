import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverPannelComponent } from './driver-pannel.component';

describe('DriverPannelComponent', () => {
  let component: DriverPannelComponent;
  let fixture: ComponentFixture<DriverPannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverPannelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
