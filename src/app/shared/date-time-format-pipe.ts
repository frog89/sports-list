import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
  private readonly MyFireFormat: string = "yyyy-MM-dd'T'HH:mm:sss'Z'";
  transform(value: any, args?: any): any {
    return super.transform(value, this.MyFireFormat);
  }
}