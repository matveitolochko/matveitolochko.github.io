/**@typedef {3}DIMENSION*/


/**
 * @typedef {N extends 1?[T]:N extends 2?[T,T]:N extends 3?[T,T,T]:T[]} Vec
 * @template T Item of the Vector
 * @template {number} N Vector size
*/
/**@typedef {Vec<number,DIMENSION>}Pos*/
/**@typedef {{x:Pos;y:Pos;z:Pos;m:number}}Body*/
/**@typedef {{id:string;fov:number;bodies:Body[];G:number}}Config*/

(/**@param {Config}CONFIG*/function(CONFIG){
    /**@returns {HTMLCanvasElement}*/
    function getCanvas() {
        let canvas = document.getElementById(CONFIG.id);
        if (canvas) return canvas;
        canvas = document.createElement("canvas");
        canvas.id = CONFIG.id;
        document.body.appendChild(canvas);
        return canvas;
    }


    function updateBodies() {
        for(let i = 0; i < CONFIG.bodies.length; i++) {
            const body = CONFIG.bodies[i];

            for(let j = 0; j < CONFIG.bodies.length; j++) {
                if (i === j) continue; // avoid updating using itself


            }
        }
    }

    function main() {
        const canvas = getCanvas();
        const ctx = canvas.getContext("2d");
        // This indicates that the canvas doesn't support 2D rendering...
        // Abort and exit quietly as this isn't crucial
        if (!ctx) return;
    }


    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", main);
    } else {
        main()
    }
})({
    id: "background",
    fov: 100,
    bodies: [
        {
            x: [10, 0],
            v: [0, 0],
            a: [0, 0],
            m: 10,
        },
        {
            x: [0, 10],
            v: [0, 0],
            a: [0, 0],
            m: 10,
        },
        {
            x: [-10, 0],
            v: [0, 0],
            a: [0, 0],
            m: 10
        }
    ],
    G: (6.6743 * Math.pow(10, -11))
})
