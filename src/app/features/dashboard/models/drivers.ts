import { driversData } from "../../../../../../simulation/drivers";

export type Driver = {
  id: number;
  name: string;
  code: string;
  team: string;
  color: string;
}

export type DriverState = {
  basePace: number;
  paceVariance: number;
  totalDistance: number;
  lapProgress: number;
  lastLapTime: number;
  interval: number;
  tire: string;
  tireAge: number;
} & Driver;

export type TypeOf<T> = T extends string ? string : T extends number ? number : T extends boolean ? boolean : never;

type DriverKeyValue<T> = {
  [K in keyof T]: TypeOf<T[K]>;
}

export type DriverData = DriverKeyValue<typeof driversData[0]>
