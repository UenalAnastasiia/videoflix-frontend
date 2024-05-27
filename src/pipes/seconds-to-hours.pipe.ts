import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToHours',
  standalone: true
})
export class SecondsToHoursPipe implements PipeTransform {

  transform(value: number): string {
       const minutes: number = Math.floor(value / 3600);
       const seconds: number = Math.floor(value % 3600);
       return minutes + ':' + ('0' + seconds).slice(-2);
    }
}