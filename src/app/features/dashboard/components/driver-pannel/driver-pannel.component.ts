import { Component, inject, input } from '@angular/core';
import { DriverState } from '../../models/drivers';
import { RaceService } from '../../services/race/race.service';
import { LapTimePipe } from '../../pipes/lap-time.pipe';

@Component({
  selector: 'app-driver-pannel',
  imports: [LapTimePipe],
  templateUrl: './driver-pannel.component.html',
  styleUrl: './driver-pannel.component.css'
})
export class DriverPannelComponent {
  // Services
  private readonly _raceService = inject(RaceService);
  driver = this._raceService.selectedDriver;
}
