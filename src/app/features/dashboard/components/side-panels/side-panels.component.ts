import { Component } from '@angular/core';
import { CloudServicesComponent } from "../cloud-services/cloud-services.component";
import { RaceStatusComponent } from "../race-status/race-status.component";
import { DriverFocusComponent } from "../driver-focus/driver-focus.component";

@Component({
  selector: 'app-side-panels',
  imports: [CloudServicesComponent, RaceStatusComponent, DriverFocusComponent],
  templateUrl: './side-panels.component.html',
  styleUrl: './side-panels.component.css'
})
export class SidePanelsComponent {

}
