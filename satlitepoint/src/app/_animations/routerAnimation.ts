import { animate, style, transition, trigger, query } from "@angular/animations";

export const routeAnimation = 
    trigger("routeAnimation", [
        // transition("* => *", [ //any state to any state
        //     // style({
        //     //     background: "blue"
        //     // }),
        //     // style({
        //     //     backgroundColor:"cornflowerblue"
        //     // }),
        //     animate(2000, style({
        //         backgroundColor: "plum"
        //     })), //will animate back to its normal state or style can be included to animate to a style
        //     animate(2000) //full animation from blue plum and transparent
        // ]),
        
        // transition("* => *", [
        //     query(":enter", [//will select from DOM
        //         style({
        //             background: 'red',
        //             display:"block"
        //         }),
        //         animate(2000)
               
        //     ], {optional:true}),
        //     style({
        //         background: 'blue'
        //     }),
        //     animate(2000) 
        // ]),

        // transition("* => *", [
        //     query(":enter", style({
        //         opacity:0,
        //         display:"block"
        //     }), {optional:true}),
        //     animate("2000ms ease-in")
        // ]),

        // transition("* => *", [
        //     style({
        //         position:"relative"
        //     }),

        //     query(":enter, :leave", [
        //         style({
        //             position:"absolute",
        //             top:0,
        //             left:0
        //         })
        //     ], {optional:true}),
        //     query(":enter", [
        //         style({
        //             opacity:0
        //         })
        //     ], {optional:true}),
        //     query(":leave", [
        //         style({
        //             display:"block"
        //         }),
        //         animate(2000, style({
        //         opacity:0,
        //         }))
        //     ], {optional:true}),
        //     query(":enter", style({
        //         opacity:0,
        //         display:"block"
        //     }), {optional:true}),
        //     animate("2000ms ease-in")
        // ]),
        transition("* => *", [
            style({
                position:"relative"
            }),

            query(":enter, :leave", [
                style({
                    position:"absolute",
                    top:0,
                    left:0
                })
            ], {optional:true}),
            query(":enter", [
                style({
                    opacity:0
                })
            ], {optional:true}),
            query(":leave", [
                style({
                    display:"block"
                }),
                animate(1000, style({
                opacity:0,
                }))
            ], {optional:true}),
            query(":enter", style({
                opacity:0,
                display:"block"
            }), {optional:true}),
            animate("1000ms ease-in")
        ]) 
    ])

