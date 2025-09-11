/**@typedef {[number, number]}Vec*/
/**@typedef {{x:Vec;v:Vec;a:Vec;m:number;id:string}}Planet*/
/**@typedef {{bodies:Planet[];G:number;d:number}}Config*/

(/**@param {Config}CONFIG*/function(CONFIG){
    CONFIG.G = - Math.abs(CONFIG.G); // make sure it is negative

    /**@returns {HTMLDivElement[]}*/
    function initBodies() {
        const bodies = new Array(CONFIG.bodies.length);
        for(let i = 0; i < CONFIG.bodies.length; i++) {
            const body = document.createElement("div");
            body.id = `background-body${i}`;
            body.classList.add("background-blob");
            body.style.display = "flex";
            body.style.transform = `translate3d(calc(${
                CONFIG.bodies[i].x[0]
            }px - 50%), calc(${
                CONFIG.bodies[i].x[1]
            }px - 50%), 0)`
            document.body.appendChild(body);
            bodies[i] = body;
        }
        return bodies;
    }

    /**
     * @param {number} i index of the object to calculate new acceleration for.
     * @returns {Vec} new acceleration of the object.
    */
    function calculateNewAcceleration(i) {
        const r_i = CONFIG.bodies[i].x;

        let output_x = 0;
        let output_y = 0;

        for(let j = 0; j < CONFIG.bodies.length; j++) {
            if (i === j) continue; // avoid updating using itself

            const r_j = CONFIG.bodies[j].x;
            const m_j = CONFIG.bodies[j].m;

            const diff_r_x = r_i[0] - r_j[0];
            const diff_r_y = r_i[1] - r_j[1];
            const top_x = diff_r_x * m_j;
            const top_y = diff_r_y * m_j;

            const mag = Math.pow(diff_r_x, 2) + Math.pow(diff_r_y, 2);

            output_x += (top_x / mag);
            output_y += (top_y / mag);
        }
        
        return [output_x * CONFIG.G, output_y * CONFIG.G];
    }

    const temp_new_values_arena = new Array(CONFIG.bodies.length);

    function updateBodies(deltaT) {
        for(let i = 0; i < CONFIG.bodies.length; i++) {
            temp_new_values_arena[i] = calculateNewAcceleration(i);
        }
        for(let i = 0; i < CONFIG.bodies.length; i++) {
            CONFIG.bodies[i].x[0] += CONFIG.bodies[i].v[0] * deltaT;
            CONFIG.bodies[i].x[1] += CONFIG.bodies[i].v[1] * deltaT;
            
            CONFIG.bodies[i].v[0] += CONFIG.bodies[i].a[0] * deltaT;
            CONFIG.bodies[i].v[1] += CONFIG.bodies[i].a[1] * deltaT;
            
            CONFIG.bodies[i].a = temp_new_values_arena[i];
            temp_new_values_arena[i] = [0, 0];
        }
    }

    function main() {
        const bodies = initBodies(CONFIG.bodies.length);

        // const canvas = getCanvas();
        const CENTER_X = window.screen.width / 2;
        const CENTER_Y = window.screen.height / 2;

        for (let i = 0; i < CONFIG.bodies.length; i++) {
            CONFIG.bodies[i].x[0] += CENTER_X;
            CONFIG.bodies[i].x[1] += CENTER_Y;
        }

        function tick() {
            updateBodies(1);

            for(let i = 0; i < CONFIG.bodies.length; i++) {
                // console.log(bodies[i])
                bodies[i].style.transform = `translate3d(calc(${
                    CONFIG.bodies[i].x[0]
                }px - 50%), calc(${
                    CONFIG.bodies[i].x[1]
                }px - 50%), 0)`

                // renderPixel(body.x[0], body.x[1], 1);
            }

            requestAnimationFrame(tick);
        }

        tick();
    }



    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", main);
    } else {
        main()
    }
})({
    bodies: [
        {
            x: [-100, 0],
            v: [0, 0],
            a: [0, 0],
            m: 10,
        },
        {
            x: [150, 0],
            v: [0, 0],
            a: [0, 0],
            m: 10,
        },
        {
            x: [120, -200],
            v: [0, 0],
            a: [0, 0],
            m: 10
        }
    ],
    G: (6.6743 * Math.pow(10, -2))
})
