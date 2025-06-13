import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceStatusComponent } from './race-status.component';

describe('RaceStatusComponent', () => {
  let component: RaceStatusComponent;
  let fixture: ComponentFixture<RaceStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaceStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaceStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
