export type Driver = {
  id: number;
  name: string;
  code: string;
  team: string;
  color: string;
  photo: string;
}

export type DriverState = {
  basePace: number;
  paceVariance: number;
  totalDistance: number;
  lapProgress: number;
  lastLapTime: number;
  interval: number;
  distanceFromLeader: number;
  tire: string;
  tireAge: number;
} & Driver;

export type DriverData = Driver
