import { Component, input } from '@angular/core';
import { RaceHeaderComponent } from "../race-header/race-header.component";
import { TrackComponent } from "../track/track.component";
import { DriverState } from '../../models/drivers';

@Component({
  selector: 'app-race',
  imports: [RaceHeaderComponent, TrackComponent],
  templateUrl: './race.component.html',
  styleUrl: './race.component.css'
})
export class RaceComponent {
  drivers = input.required<DriverState[]>();
}
