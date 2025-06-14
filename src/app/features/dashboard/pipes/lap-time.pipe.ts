import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lapTime'
})
export class LapTimePipe implements PipeTransform {

  transform(value?: string): string {
    const [seconds, miliseconds] = String(value).split('.');
    return `${Math.floor(Number(seconds) / 60)}:${Number(seconds) % 60}.${miliseconds}`;
  }

}
