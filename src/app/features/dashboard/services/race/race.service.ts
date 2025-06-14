import { computed, Injectable, signal } from '@angular/core';
import type { FastestLap, RaceInfo, RaceState } from '../../models/race';
import { driversData } from '../../../../../../../simulation/drivers';
import { racesData } from '../../../../../../../simulation/races';
import { DriverData, DriverState } from '../../models/drivers';

@Injectable({
  providedIn: 'root',
})
export class RaceService {
  // Signals
  private _raceState = signal<RaceState>([]);
  raceState = computed(() => this._raceState());
  private _fastestLap = signal<FastestLap>({time: 999, driverId: null});
  fastestLap = computed(() => this._fastestLap());
  private _reset = signal(false);
  reset = computed(() => this._reset)
  private _raceInfo = signal<RaceInfo | null>(null);
  raceInfo = computed<RaceInfo | null>(() => this._raceInfo());

  hoverDriver = signal<string | undefined>(undefined);
  private _selectedDriver = signal<DriverState | null>(null);
  selectedDriver = computed(() => this._selectedDriver());

  initializeRaceState() {
    const newRaceState = this.generateRandomInitialRaceState();
    this._raceState.set(newRaceState);
  }

  resetRaceState() {
    this.initializeRaceState();
  }

  private generateRandomInitialRaceState(
    drivers: DriverData[] = driversData as unknown as DriverData[]): DriverState[] {
    return drivers
      .map((driver) => ({
        ...driver,
        basePace: this.generateBasePace(),
        paceVariance: this.generatePaceVariance(),
        interval: 0,
        distanceFromLeader: 0,
        lapProgress: 0,
        lastLapTime: 0,
        tire: 'M',
        tireAge: 0,
        totalDistance: 0,
      }))
      .sort(() => Math.random() - 0.5); // Sort to have different grid starts.
  }

  private generateBasePace(): number {
    return 85 + Math.random() * 5;
  }

  private generatePaceVariance(): number {
    return 0.5 + Math.random();
  }

  getRaceInfo() {
    this._raceInfo.set(racesData[0]);
  }

  // TODO: put in track service
  hover(driverCode?: string) {
    this.hoverDriver.set(driverCode)
  }

  updateRace(pathLength: number) {
    this._raceState.update((state) => {
      state.forEach((driver) => {
        const paceModifier = 1 - driver.tireAge / 200;
        const randomVariance = (Math.random() - 0.5) * driver.paceVariance;
        const currentSpeed = (driver.basePace + randomVariance) * paceModifier;
        const distanceThisTick = pathLength / currentSpeed / 4; // distance covered in 0.25sec
        driver.totalDistance += distanceThisTick;
        driver.lapProgress = (driver.totalDistance % pathLength) / pathLength;

        if (
          Math.floor(driver.totalDistance / pathLength) >
          Math.floor((driver.totalDistance - distanceThisTick) / pathLength)
        ) {
          driver.lastLapTime = currentSpeed;
          driver.tireAge += 1;

          if (driver.lastLapTime < this.fastestLap().time) {
            this._fastestLap.set({
              time: driver.lastLapTime,
              driverId: driver.id
            })
          }
        }
      });
      return state;
    });
  }

  updateLeaderboard(pathLength: number) {
    let leaderDistance = 0;

    this._raceState.update((raceState) =>
      raceState.sort((a, b) => b.totalDistance - a.totalDistance)
    );

    leaderDistance = this.raceState()?.[0].totalDistance;

    for (let i = 0; i < this.raceState()?.length; i++) {
      if (i === 0) {
        this._raceState.update((prevState) => {
          const driver = prevState[0];
          driver.interval = 0;
          return [...prevState];
        });
      } else {
        const timeDiff =
          (this.raceState()[i - 1].totalDistance -
            this.raceState()[i].totalDistance) /
          (pathLength / this.raceState()[i].basePace);
        const distanceFromLeader =
          (this.raceState()[0].totalDistance -
            this.raceState()[i].totalDistance) /
          (pathLength / this.raceState()[i].basePace);
        this._raceState.update((prevState) => {
          prevState[i].interval =
            i === 1
              ? (leaderDistance - this.raceState()[i].totalDistance) /
                (pathLength / this.raceState()[i].basePace)
              : timeDiff;
          prevState[i].distanceFromLeader = i === 0 ? 0 : distanceFromLeader;
          return prevState;
        });
      }
    }
  }

  // TODO: put in other service.
  selectDriver(driver: DriverState){
    this._selectedDriver.set(driver);
  }
}

