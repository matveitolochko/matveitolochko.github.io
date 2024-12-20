type TurboGUICanvas = CanvasRenderingContext2D;

declare type TurboGUITask = (delta: number) => void;
declare interface TurboGUIContext {
    /** Width of the canvas */
    readonly width: number;
    /** Hieght of the canvas */
    readonly height: number;
    /** Lists of {@link TurboGUITask task}s */
    tasks: TurboGUITask[];
    /** The underlying {@link TurboGUICanvas canvas} instance */
    readonly canvas: TurboGUICanvas;

    /**
     * Draws a curve
     * 
     * @param {number} x Starting X-coordinate
     * @param {number} y Starting Y-coordinate
     * @param {number} r Radius of the arc starting from the point ({@link x}, {@link y})
     * @param {number} theta Starting angle
     * @param {number} phi Ending angle
     * @param {number} end The ending time of the operation
     * @returns {TurboGUITask} a turbogui task
    */
    curveTo(
        x: number, y: number, r: number,
        theta: number, phi: number,
        end: number
    ): TurboGUITask;

    /**
     * Draws a curve.
     * 
     * This variant allows for specifying the time offset.
     * 
     * @param {number} x Starting X-coordinate
     * @param {number} y Starting Y-coordinate
     * @param {number} r Radius of the arc starting from the point ({@link x}, {@link y})
     * @param {number} theta Starting angle
     * @param {number} phi Ending angle
     * @param {number} end The ending time of the operation
     * @param {number | undefined} start The starting time (defaults to 0, so immediate start)
     * @returns {TurboGUITask} a gui task
    */
    curveTo(
        x: number, y: number, r: number,
        theta: number, phi: number,
        end: number, start?: number
    ): TurboGUITask;

    /**
     * Draws a curve.
     * 
     * This variant allows for specifying the time offset,
     * and changing the direction of motion.
     * 
     * @param {number} x Starting X-coordinate
     * @param {number} y Starting Y-coordinate
     * @param {number} r Radius of the arc starting from the point ({@link x}, {@link y})
     * @param {number} theta Starting angle
     * @param {number} phi Ending angle
     * @param {number} end The ending time of the operation
     * @param {number | undefined} start The starting time (defaults to 0, so immediate start)
     * @param {boolean | undefined} cw If the arc should go clockwise (defaults to true)
     * @returns {TurboGUITask} a gui task
    */
    curveTo(
        x: number, y: number, r: number,
        theta: number, phi: number,
        end: number, start?: number,
        cw?: boolean,
    ): TurboGUITask;

    /**
     * Draws a curve.
     * 
     * This variant allows for specifying the time offset,
     * changing the direction of motion,
     * and changing the style of the canvas.
     * 
     * @param {number} x Starting X-coordinate
     * @param {number} y Starting Y-coordinate
     * @param {number} r Radius of the arc starting from the point ({@link x}, {@link y})
     * @param {number} theta Starting angle
     * @param {number} phi Ending angle
     * @param {number} end The ending time of the operation
     * @param {number | undefined} start The starting time (defaults to 0, so immediate start)
     * @param {boolean | undefined} cw If the arc should go clockwise (defaults to true)
     * @param {((canvas: CanvasRenderingContext2D) => void) | undefined} canvasMod Canvas modifier
     * @returns {TurboGUITask} a gui task
    */
    curveTo(
        x: number, y: number, r: number,
        theta: number, phi: number,
        end: number, start?: number,
        cw?: boolean,
        canvasMod?: (canvas: Canvas) => void
    ): TurboGUITask;

    /**
     * Creates a line from ({@link x1}, {@link y1}) to ({@link x2}, {@link y2}).
     * 
     * @param {number} x1 X-Coordinate of the start
     * @param {number} y1 Y-Coordinate of the start
     * @param {number} x2 X-Coordinate of the end
     * @param {number} y2 Y-Coordinate of the end
     * @param {number} end The ending time of the operation
     * @returns {TurboGUITask} a gui task
    */
    lineTo(
        x1: number, y1: number,
        x2: number, y2: number,
        end: number,
    ): TurboGUITask;

    /**
     * Creates a line from ({@link x1}, {@link y1}) to ({@link x2}, {@link y2}).
     * 
     * @param {number} x1 X-Coordinate of the start
     * @param {number} y1 Y-Coordinate of the start
     * @param {number} x2 X-Coordinate of the end
     * @param {number} y2 Y-Coordinate of the end
     * @param {number} end The ending time of the operation
     * @param {number | undefined} start The starting time (defaults to 0, so immediate start)
     * @returns {TurboGUITask} a gui task
    */
    lineTo(
        x1: number, y1: number,
        x2: number, y2: number,
        end: number, start?: number,
    ): TurboGUITask;

    /**
     * Creates a line from ({@link x1}, {@link y1}) to ({@link x2}, {@link y2}).
     * 
     * @param {number} x1 X-Coordinate of the start
     * @param {number} y1 Y-Coordinate of the start
     * @param {number} x2 X-Coordinate of the end
     * @param {number} y2 Y-Coordinate of the end
     * @param {number} end The ending time of the operation
     * @param {number | undefined} start The starting time (defaults to 0, so immediate start)
     * @param {((canvas: CanvasRenderingContext2D) => void) | undefined} canvasMod Canvas modifier
     * @returns {TurboGUITask} a gui task
    */
    lineTo(
        x1: number, y1: number,
        x2: number, y2: number,
        end: number, start?: number,
        canvasMod?: (canvas: Canvas) => void,
    ): TurboGUITask;
}

declare function TurboGUI(fn: (ctx: TurboGUIContext) => void): void;
