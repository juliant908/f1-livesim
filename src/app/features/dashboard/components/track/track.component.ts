import { AfterViewInit, Component, DestroyRef, ElementRef, inject, input, QueryList, viewChild, viewChildren } from '@angular/core';
import { DriverState } from '../../models/drivers';
import { interval } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { RaceService } from '../../services/race/race.service';

@Component({
  selector: 'app-track',
  imports: [],
  templateUrl: './track.component.html',
  styleUrl: './track.component.css',
})
export class TrackComponent implements AfterViewInit {
  // Services
  private readonly _raceService = inject(RaceService);

  // Inputs
  drivers = input.required<DriverState[]>();

  // Child views
  track = viewChild.required<ElementRef<SVGPathElement>>('track');
  carDots = viewChildren<QueryList<ElementRef<HTMLDivElement>>>('car');

  // Ref
  destroy$ = inject(DestroyRef);
  a = 500
  ngAfterViewInit() {
    this.initializeTrack();
  }

  initializeTrack(){
      const path = this.track()?.nativeElement;
      if(!path) return;
      const pathLength = path.getTotalLength();
      interval(125)
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe(() => {
        this._raceService.updateRace(pathLength);
      })

      if(!pathLength) return;

      const animate = () => {

        this.carDots().forEach((carDot, index) => {
          const driver = this.drivers()[index];
          const point = this.track()?.nativeElement.getPointAtLength(
            (1700 - driver.lapProgress * pathLength + pathLength) % pathLength
          );
          // @ts-expect-error I think it's a viewChildren signal bug
          carDot?.nativeElement.setAttribute(
            'style',
            `left: ${(point?.x+50).toString()}px;
            top: ${(point?.y+75).toString()}px`
          );

        })

      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }
}
