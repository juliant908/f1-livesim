import { Component, computed, DestroyRef, inject, input, signal } from '@angular/core';
import type { Driver, DriverState } from "@/app/features/dashboard/models/drivers"
import { RaceService } from '../../services/race/race.service';
import { TiresService } from '../../services/tires/tires.service';
import { Tires } from '../../models/tires';
import { RaceState } from '../../models/race';
import { interval } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-leaderboard',
  imports: [],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent {
  // Services
  private readonly _raceService = inject(RaceService);

  drivers = computed<RaceState>(() => this._raceService.raceState());
  tires = input.required<Tires>();
  state = [];
  isFastest = computed(() => this._raceService.fastestLap().driverId);
  showInterval = true;

  // Destroy ref
  destroy$ = inject(DestroyRef);
  ngOnInit(){
    interval(1000)
    .pipe(takeUntilDestroyed(this.destroy$))
    .subscribe((num: number) => {
        if(num === 0) return;
        if(num % 30 === 0 && this.showInterval){
          this.showInterval = false
          return;
        }
        if(num % 5 === 0 && !this.showInterval){
          this.showInterval = true;
        }
      }
    )
  }

  // TODO: put in track service
  test(str?: string){
    this._raceService.hover(str)
  }

  selectDriver(driver: DriverState){
    this._raceService.selectDriver(driver);
  }
}
