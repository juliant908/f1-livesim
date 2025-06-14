import { Component, inject } from '@angular/core';
import { RaceService } from '../../services/race/race.service';
import { TrackService } from '../../services/track/track.service';

@Component({
  selector: 'app-race-header',
  imports: [],
  templateUrl: './race-header.component.html',
  styleUrl: './race-header.component.css'
})
export class RaceHeaderComponent {
  // Services
  private readonly _raceService = inject(RaceService);
  private readonly _trackService = inject(TrackService);

  resetSim() {
    this._raceService.resetRaceState();
  }
}
