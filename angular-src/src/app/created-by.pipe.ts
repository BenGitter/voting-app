import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "createdBy"
})
export class CreatedByPipe implements PipeTransform{
  transform(polls: any, author: string){
    return polls.filter((el, i) => {
      return el.created_by == author;
    })
  }
}