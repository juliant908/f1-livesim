import { Component, inject } from '@angular/core';
import { CloudServicesComponent } from "../cloud-services/cloud-services.component";
import { RaceStatusComponent } from "../race-status/race-status.component";
import { DriverPannelComponent } from "../driver-pannel/driver-pannel.component";
import { RaceService } from '../../services/race/race.service';

@Component({
  selector: 'app-side-panels',
  imports: [CloudServicesComponent, RaceStatusComponent, DriverPannelComponent],
  templateUrl: './side-panels.component.html',
  styleUrl: './side-panels.component.css'
})
export class SidePanelsComponent {
}
