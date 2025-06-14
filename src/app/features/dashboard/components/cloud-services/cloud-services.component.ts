import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
@Component({
  selector: 'app-cloud-services',
  imports: [],
  templateUrl: './cloud-services.component.html',
  styleUrl: './cloud-services.component.css'
})
export class CloudServicesComponent {
  // Child views



  services = ['aws-kinesis', 'aws-lambda', 'aws-dynamo'];

  destroy$ = inject(DestroyRef);

  ngAfterViewInit() {
    this.animateAwsPipeline();
  }

  animateAwsPipeline() {
    let i = 0;
    interval(250).pipe(takeUntilDestroyed(this.destroy$)).subscribe(
      () => {
        if (i > 0) document.getElementById(this.services[i-1])?.classList.remove('active');
        if (i < this.services.length) {
            document.getElementById(this.services[i])?.classList.add('active');
        } else {
            document.getElementById(this.services[i-1])?.classList.remove('active');
            i = -1
        }
        i++;
      }
    )
  }
}
