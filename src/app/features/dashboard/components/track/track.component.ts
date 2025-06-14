import { AfterViewInit, Component, DestroyRef, ElementRef, inject, input, QueryList, viewChild, viewChildren } from '@angular/core';
import { DriverState } from '../../models/drivers';
import { interval, Observable, switchMap, takeUntil } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'
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

  drivers = this._raceService.raceState;

  // Child views
  track = viewChild.required<ElementRef<SVGPathElement>>('track');
  carDots = viewChildren<QueryList<ElementRef<HTMLDivElement>>>('car');

  // Observables
  destroy$ = inject(DestroyRef);

  // Lifecycle
  ngAfterViewInit() {
    this.initializeTrack();
  }

  get code(){
    return this._raceService.hoverDriver();
  }

  initializeTrack(){ // TODO: put in track service
    const path = this.track()?.nativeElement;
    const start = 1500;
    let pathHeight = path.getBoundingClientRect().height;
    const rectHeight = path.getBBox().height;
    const strokeWidth = path.getAttribute('stroke-width');
    let pathWidth = Math.ceil(rectHeight / Number(strokeWidth)) * 1.5;
    if (!path) return;
    const pathLength = path.getTotalLength();
    const initialPosition = this.track()?.nativeElement.getPointAtLength(
      (start + pathLength) % pathLength
    );
    this.carDots().forEach((carDot, index) => {
      // @ts-expect-error I think it's a viewChildren signal bug
      carDot.nativeElement.style.transform = `translate(${
        initialPosition?.x + index * 10
      }px, ${
        initialPosition?.y - (pathHeight + pathWidth)
      }px`;
    });
    interval(250)
      .pipe(
        takeUntilDestroyed(this.destroy$)
      )
      .subscribe((num) => {
        if(num > 24) this._raceService.updateRace(pathLength); // updates every quater of a second and begins after 6 seconds
        if(num % 4 !== 0) return;
        this._raceService.updateLeaderboard(pathLength); // updates every second
        const newPathHeight = path.getBoundingClientRect().height;
        if (pathHeight !== newPathHeight) {
          pathHeight = newPathHeight;
          pathWidth = Math.ceil(rectHeight / Number(strokeWidth));
        }
      });
    if (!pathLength) return;

    const animate = () => {
      this.carDots().forEach((carDot, index) => {
        const driver = this.drivers()[index];
        const point = this.track()?.nativeElement.getPointAtLength(
          (start - driver.lapProgress * pathLength + pathLength + index * 10) %
            pathLength
        );
        const svg = path.ownerSVGElement!;
        const svgPoint = svg.createSVGPoint();
        svgPoint.x = point.x;
        svgPoint.y = point.y;
        const ctm = path.getCTM();
        const screenPoint = svgPoint.matrixTransform(ctm!);
        // @ts-expect-error I think it's a viewChildren signal bug
        carDot.nativeElement.style.zIndex = index + 1;
        // @ts-expect-error I think it's a viewChildren signal bug
        carDot.nativeElement.style.transform = `translate(${
          screenPoint?.x
        }px, ${
          screenPoint?.y -
          (pathHeight + pathWidth) +
            // @ts-expect-error I think it's a viewChildren signal bug
            (carDot.nativeElement.getBoundingClientRect().width > 12 ? -5 : carDot.nativeElement.getBoundingClientRect().width )
        }px`;

      });

      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }
}
