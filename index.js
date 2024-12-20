/// <reference path="./turbogui.d.ts" />

TurboGUI(ctx => {
    const/**@type {HTMLImageElement}*/icon = document.getElementById("icon");
    const iconDimensions = icon.getBoundingClientRect();
    const iconRadius = iconDimensions.height / 2;

    const BOX_SIZE = 20;
    const START_X = iconDimensions.x + iconDimensions.width / 2;
    const START_Y = iconDimensions.y + iconRadius;

    function paintGrid() {
        ctx.canvas.clearRect(0, 0, ctx.width, ctx.height);

        const Y_START = START_Y - ctx.height * BOX_SIZE;
        const Y_END   = START_Y + ctx.height * BOX_SIZE;
        const X_START = START_X - ctx.width  * BOX_SIZE;
        const X_END   = START_X + ctx.width  * BOX_SIZE;

        for(let x = X_START; x <= X_END; x += BOX_SIZE) {
            if (x <= 0 || x >= ctx.width) continue;
            for(let y = Y_START; y <= Y_END; y += BOX_SIZE) {
                if (y <= 0 || y >= ctx.height) continue;
                
                ctx.canvas.fillStyle = x === START_X && y === START_Y ?
                    "green" : "black";
                ctx.canvas.fillRect(x - 1, y - 1, 2, 2);
            }
        }
    }
    paintGrid();

    const boxes_in_width = Math.floor(ctx.width / BOX_SIZE);
    /** Boxes per tick */
    const BPT = (boxes) => boxes * BOX_SIZE / 4;

    const YELLOW = (c) => { c.strokeStyle = "orange" };
    const BLUE = (c) => { c.strokeStyle = "#2b2bd3" };

    const iconOuterCircle = iconRadius + 3;
    const stage1Time = BPT(boxes_in_width - 13);
    const stage2Time = stage1Time + 100;

    const stage1 = [
        ctx.lineTo(
            ctx.width,
            START_Y,
            START_X + iconOuterCircle,
            START_Y,
            stage1Time,
            0,
            YELLOW
        ),
        ctx.lineTo(
            0,
            START_Y,
            START_X - iconOuterCircle,
            START_Y,
            stage1Time,
            0,
            BLUE
        ),
    ]

    const stage2 = [
        ctx.curveTo(
            START_X, START_Y, iconRadius + 1,
            0, -Math.PI / 2 + 0.05, // end angle
            stage2Time, // time end
            stage1Time, // time start
            true,
            YELLOW
        ),
        ctx.curveTo(
            START_X, START_Y, iconRadius + 1,
            Math.PI, -Math.PI / 2 - 0.05, // end angle
            stage2Time, // time end
            stage1Time, // time start
            false,
            BLUE
        )
    ]

    ctx.tasks = [...stage1, ...stage2];
});
