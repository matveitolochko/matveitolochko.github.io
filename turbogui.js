(function(NAME) {
    const TAG = `${NAME.toLowerCase()}-canvas`;
    const ID = `__${NAME}.canvas`;
    const PI2 = Math.PI * 2;

    class TurboGUICanvasElement extends HTMLElement {
        connectedCallback() {
            const canvas = document.createElement("canvas");
            canvas.id = ID;
            canvas.style.height = this.height = window.innerHeight;
            canvas.style.width = this.width = window.innerWidth;
            canvas.style.position = this.style.position = "absolute";
            canvas.style.top = this.style.top = "0";
            canvas.style.left = this.style.left = "0";
            this.appendChild(canvas);
        }
    }
    customElements.define(TAG, TurboGUICanvasElement);

    function TurboGUI(fn) {
        const ctx = {
            tasks: [],
            canvas: null,
            height: 0,
            width: 0,
    
            curveTo: void 0,
            lineTo: void 0
        };
        const/**@type {HTMLCanvasElement}*/canvas = document.getElementById(ID);
        let i = 0;
        function updateContextSize() {
            i = 0;

            ctx.height = canvas.height = window.innerHeight;
            ctx.width = canvas.width = window.innerWidth;
            const canvasCtx = canvas.getContext("2d");
            
            ctx.curveTo = (x, y, r, theta, phi, end, start = 0, cw = true, canvasMod = () => {}) => {
                const timeDiff = end - start;
                let dr = theta - phi;
                if ( cw && phi > theta) dr += PI2;
                if (!cw && phi < theta) dr -= PI2;
                dr /= timeDiff;
                return (delta) => {
                    if (delta < start || delta > end) return;
                    canvasCtx.beginPath();
                    canvasMod(canvasCtx);
                    canvasCtx.arc(
                        x, y, r,
                        theta + dr * (delta - start),
                        theta + dr * (delta - start + 1),
                        !cw
                    );
                    canvasCtx.stroke();
                }
            }

            ctx.lineTo = (x1, y1, x2, y2, end, start = 0, canvasMod = () => {}) => {
                const timeDiff = end - start;
                const dx = (x2 - x1) / timeDiff;
                const dy = (y2 - y1) / timeDiff;
                return (delta) => {
                    if (delta < start || delta > end) return;
                    const sx = x1 + dx * (delta - start);
                    const sy = y1 + dy * (delta - start);
                    const ex = x1 + dx * (delta - start + 1);
                    const ey = y1 + dy * (delta - start + 1);
                    canvasCtx.beginPath();
                    canvasMod(canvasCtx);
                    canvasCtx.moveTo(sx, sy);
                    canvasCtx.lineTo(ex, ey);
                    canvasCtx.stroke();
                }
            }

            ctx.canvas = canvasCtx;
            fn(ctx);
        }
        updateContextSize();
        window.addEventListener('resize', updateContextSize);

        function tick() {
            ctx.tasks.forEach(t => t(i));
            i++;
            return requestAnimationFrame(tick);
        }
        tick();
    }

    Object.defineProperty(globalThis, NAME, {
        value: TurboGUI
    });
    
})("TurboGUI");