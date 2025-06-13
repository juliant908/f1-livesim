import { Component, inject, input } from '@angular/core';
import type { Driver, DriverState } from "@/app/features/dashboard/models/drivers"
import { RaceService } from '../../services/race/race.service';
import { TiresService } from '../../services/tires/tires.service';
import { Tires } from '../../models/tires';

@Component({
  selector: 'app-leaderboard',
  imports: [],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent {
  // Services
  private readonly _raceService = inject(RaceService);

  drivers = input.required<DriverState[]>();
  tires = input.required<Tires>();
  state = [];
  isFastest = false;

  ngOnInit(){
    this.isFastest =
      this._raceService.fastestLap().driverId === this.drivers()[0].id;
  }
}
