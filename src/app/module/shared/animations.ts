import { trigger, style, transition, animate } from '@angular/animations';

export const slideIn = trigger('slideIn', [
  transition('void => *', [
    style({ opacity: 0, transform: 'translate(-20px,0px)' }),
    //animate(1000, style({ opacity: 0.5, transform: 'translate(-25px,10px)' })),
    animate(1000)
  ])
]);
