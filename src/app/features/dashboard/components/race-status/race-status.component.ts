import { Component, computed, inject } from '@angular/core';
import { RaceService } from '../../services/race/race.service';
import { RaceInfo } from '../../models/race';

@Component({
  selector: 'app-race-status',
  imports: [],
  templateUrl: './race-status.component.html',
  styleUrl: './race-status.component.css'
})
export class RaceStatusComponent {
  // Services
  private readonly _raceService = inject(RaceService);

  raceInfo = computed(() => this._raceService.raceInfo());
  currentLap = computed(() => {
    const leaderDistance = this._raceService.raceState()[0]?.totalDistance
    return Math.floor((leaderDistance / 1963) % 1963 + 1)
  })
}
