import { Component, computed, inject, signal } from '@angular/core';
import { LeaderboardComponent } from "../../components/leaderboard/leaderboard.component";
import { RaceComponent } from "../../components/race/race.component";
import { SidePanelsComponent } from "../../components/side-panels/side-panels.component";
import { RaceService } from '../../services/race/race.service';
import { TiresService } from '../../services/tires/tires.service';
import { DriverState } from '../../models/drivers';
import { Tires } from '../../models/tires';

@Component({
  selector: 'app-dashboard',
  imports: [LeaderboardComponent, RaceComponent, SidePanelsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  private readonly _raceService = inject(RaceService);
  private readonly _tiresService = inject(TiresService);

  private _tires = signal<Tires>({});
  tires = computed<Tires>(() => this._tires());

  ngOnInit(){
    this.setInitialState();
  }

  setInitialState(){
    this._raceService.initializeRaceState();
    this.setTires();
    this.setRace();
  }

  setRace() {
    this._raceService.getRaceInfo();
  }

  setTires() {
    const tires = this._tiresService.getTires();
    this._tires.set(tires);
  }

}
