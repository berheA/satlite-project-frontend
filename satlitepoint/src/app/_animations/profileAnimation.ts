import {
    animate,
    query,
    sequence,
    stagger,
    style,
    transition,
    trigger
  } from "@angular/animations";

  export const profileAnimation = trigger("dropMenu", [
   
     transition(":enter", [ //target dom elements entering
            style({
                opacity:0
            }),
            animate(2000, style({
                opacity: 1,
            })), //will animate back to its normal state or style can be included to animate to a style
        ]),

        transition(":leave", [ //target dom elements entering
            animate(2000, style({
                opacity: 0,
            })), //will animate back to its normal state or style can be included to animate to a style
        ]),

  ])