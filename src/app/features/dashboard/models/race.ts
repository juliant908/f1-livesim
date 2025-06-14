import type { DriverState } from "./drivers";

export type RaceState = Array<DriverState>

export type FastestLap = {
  driverId: number | null;
  time: number;
}

export type RaceInfo = {
  name: string;
  laps: number;
}
